import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { actionLogoutUser, User } from "@/shared/storeSlices/userSlice";
import { actionClearBusiness } from "../storeSlices/businessSlice";

const baseSettingRequest = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL_SERVER,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const username = (getState() as { user: { user: User } }).user?.user
      ?.username;
    if (username) {
      headers.set("X-username", username);
    }

    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseRequest = await baseSettingRequest(args, api, extraOptions);

  if (baseRequest.error && baseRequest.error.status === 401) {
    const errorMesage =
      (baseRequest.error.data as { message: string })?.message ||
      "Unknown message";

    if (
      errorMesage !== "Invalid or expired access token" &&
      errorMesage !== "Access token is missing"
    ) {
      return baseRequest;
    }

    const refreshRequest = await baseSettingRequest(
      { url: "auth/refreshToken", method: "POST" },
      api,
      extraOptions
    );

    if (!refreshRequest.data) {
      api.dispatch(actionLogoutUser());
      api.dispatch(actionClearBusiness());
      return baseRequest;
    }

    return await baseSettingRequest(args, api, extraOptions);
  }

  return baseRequest;
};

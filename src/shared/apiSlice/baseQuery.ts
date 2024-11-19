import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { actionLogoutUser } from "@/features/auth/model/userSlice";

const baseSettingRequest = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL_SERVER,
  credentials: "include",
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
      { url: "refresh", method: "POST" },
      api,
      extraOptions
    );

    if (!refreshRequest.data) {
      api.dispatch(actionLogoutUser());
      return baseRequest;
    }

    return await baseSettingRequest(args, api, extraOptions);
  }

  return baseRequest;
};

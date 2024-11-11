import { apiStore } from "@/shared/apiSlice/api";
import { UserDto } from "../model/types";

const getUser = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserDto, null>({
      query: () => ({ url: "auth/user" }),
    }),
  }),
});

export const { useLazyGetUserQuery } = getUser;

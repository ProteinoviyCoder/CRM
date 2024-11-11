import { apiStore } from "@/shared/apiSlice/api";
import type { DataLogin, ResLoginDto } from "../model/types";

const getAuth = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getAuth: builder.mutation<ResLoginDto, DataLogin>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
  }),
});

export const { useGetAuthMutation } = getAuth;

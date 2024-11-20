import { apiStore } from "@/shared/apiSlice/api";
import type { DataLogin, ResLoginDto } from "../model/types";

const getLogin = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.mutation<ResLoginDto, DataLogin>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
  }),
});

export const { useGetLoginMutation } = getLogin;

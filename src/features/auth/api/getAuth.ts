import { apiStore } from "@/shared/apiSlice/api";
import { ResAuthDto } from "../model/types";

const getAuth = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getAuth: builder.query<ResAuthDto, null>({
      query: () => ({ url: "auth/autoAuth" }),
    }),
  }),
});

export const { useLazyGetAuthQuery } = getAuth;

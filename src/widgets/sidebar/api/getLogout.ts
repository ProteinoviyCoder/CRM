import { apiStore } from "@/shared/apiSlice/api";

const getLogout = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getLogout: builder.query<null, null>({
      query: () => ({ url: "auth/logout" }),
    }),
  }),
});

export const { useLazyGetLogoutQuery } = getLogout;

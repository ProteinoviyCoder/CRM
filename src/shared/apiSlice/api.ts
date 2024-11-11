import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const apiStore = createApi({
  reducerPath: "apiStore",
  baseQuery,
  endpoints: (builder) => ({}),
});

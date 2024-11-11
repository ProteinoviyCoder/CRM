import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const apiStore = createApi({
  reducerPath: "apiStore",
  baseQuery,
  endpoints: () => ({}),
});

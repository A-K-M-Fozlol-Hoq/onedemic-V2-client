import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://onedemic-server.vercel.app/api/v1",
  }),
  tagTypes: ["user", "coruses", "exam", "exams"],
  // tags: ["user", "coruses", "exam", "exams"],
  endpoints: (builder) => ({}),
});

export default apiSlice;

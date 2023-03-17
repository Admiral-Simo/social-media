import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (input) => ({
        url: `/auth/register`,
        method: "POST",
        body: input,
      }),
    }),
    login: builder.mutation({
      query: (input) => ({
        url: `/auth/login`,
        method: "POST",
        body: input,
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = socialApi;

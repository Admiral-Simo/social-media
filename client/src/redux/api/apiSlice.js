import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  tagTypes: ["Posts"],
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
      }),
    }),
    uploadImage: builder.mutation({
      query: (input) => ({
        url: `/upload`,
        method: "POST",
        body: input,
      }),
    }),
    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetPostsQuery,
  useAddPostMutation,
  useUploadImageMutation
} = socialApi;

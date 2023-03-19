import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  tagTypes: ["Posts", "Comments", "Likes"],
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
    getComments: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    getLikes: builder.query({
      query: (postId) => `/likes?postId=${postId}`,
      providesTags: ["Likes"],
    }),
    toggleLike: builder.mutation({
      query: (data) => ({
        url: `/likes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Likes"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetPostsQuery,
  useGetCommentsQuery,
  useAddPostMutation,
  useUploadImageMutation,
  useAddCommentMutation,
  useGetLikesQuery,
  useToggleLikeMutation
} = socialApi;

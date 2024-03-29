import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  tagTypes: ["Posts", "Comments", "Likes", "Users"],
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
    getUser: builder.query({
      query: (userId) => `/users/find/${userId}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (input) => ({
        url: `/users`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["Users", "Posts"],
    }),
    getRelationships: builder.query({
      query: (followedUserId) =>
        `/relationships?followedUserId=${followedUserId}`,
      providesTags: ["Users"],
    }),
    uploadImage: builder.mutation({
      query: (input) => ({
        url: `/upload`,
        method: "POST",
        body: input,
      }),
    }),
    getPosts: builder.query({
      query: ({ userId, searchInput }) =>
        `/posts${userId ? "?userId=" + userId : ""}${
          searchInput
            ? userId
              ? "&searchInput=" + searchInput
              : "?searchInput=" + searchInput
            : ""
        }`,
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
    deletePost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    countPostEdits: builder.query({
      query: (id) => `/posts/isEdited/${id}`,
      providesTags: ["Posts"],
    }),
    getComments: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: ["Comments"],
    }),
    getCommenters: builder.query({
      query: (postId) => `/comments/commenters?postId=${postId}`,
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
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    countCommentEdits: builder.query({
      query: (id) => `/comments/isEdited/${id}`,
      providesTags: ["Comments"],
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
    toggleRelationship: builder.mutation({
      query: (data) => ({
        url: `/relationships`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetPostsQuery,
  useCountPostEditsQuery,
  useCountCommentEditsQuery,
  useGetCommentsQuery,
  useGetCommentersQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetRelationshipsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
  useGetUserQuery,
  useAddCommentMutation,
  useGetLikesQuery,
  useToggleRelationshipMutation,
  useToggleLikeMutation,
} = socialApi;

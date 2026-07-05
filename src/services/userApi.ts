import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    
    getUsers: builder.query({
      query: () => "/users",
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

  }),
});


export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
} = userApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { NewUser, SignInInfo, User } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<{ user: User; cookie: string }, SignInInfo>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        data: User;
        message: string;
        cookie: string;
      }) => {
        const user = response.data;
        const cookie = response.cookie;
        return { user, cookie };
      },
    }),
    signup: builder.mutation<User, NewUser>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        user: User;
        message: string;
        cookie: string;
      }) => {
        const user = response.user;
        return user;
      },
    }),
    signout: builder.mutation<string, string>({
      query: (cookie) => ({
        url: "logout",
        method: "POST",
        body: {
          Authorization: cookie,
        },
      }),
    }),
    getInfo: builder.query<User, number>({
      query: (id) => `users/getUserInfo?UserID=${id}`,
      transformResponse: (response: { user: User }) => response.user,
    }),
  }),
});

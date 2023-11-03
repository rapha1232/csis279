import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { NewUser, SignInInfo, User } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    signin: builder.mutation<User, SignInInfo>({
      query: (data) => ({
        url: "auth/sign-in",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        user: User;
        message: string;
        success: boolean;
        token: string;
      }) => {
        const { user } = response;
        return user;
      },
    }),
    signup: builder.mutation<User, NewUser>({
      query: (data) => ({
        url: "auth/sign-up",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        user: User;
        message: string;
        success: boolean;
        token: string;
      }) => {
        const { user } = response;
        return user;
      },
    }),
    signout: builder.mutation<string, void>({
      query: () => ({
        url: "auth/sign-out",
        method: "POST",
      }),
    }),
    getInfo: builder.query<User, number>({
      query: (id) => `users/getUserInfo?UserID=${id}`,
      transformResponse: (response: { user: User }) => response.user,
    }),
  }),
});

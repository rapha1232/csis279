import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { NewUser, SignInInfo, UpdateUser, User } from "../types";
import { getLocalStorageToken } from "../utils/localStorageUtils";

/**
 * API configuration for users.
 */
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth/",
  }),
  endpoints: (builder) => ({
    /**
     * Sign in a user.
     * @param {SignInInfo} data - The user's credentials.
     * @returns {User} - The user.
     * @returns {string} - The cookie.
     */
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
    /**
     * Sign up a user.
     * @param {NewUser} data - The user's credentials.
     * @returns {User} - The user.
     */
    signup: builder.mutation<User, NewUser>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: { data },
      }),
      transformResponse: (response: {
        data: User;
        message: string;
        cookie: string;
      }) => {
        const user = response.data;
        return user;
      },
    }),
    /**
     * Sign out a user.
     * @returns {string} - The message.
     */
    signout: builder.mutation<string, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: {
          authorization: "Bearer " + getLocalStorageToken() || "",
        },
      }),
      transformResponse: (response: { message: string }) => {
        const message = response.message;
        return message;
      },
    }),
    /**
     * Get one user.
     * @param {number} id - The id of the user.
     * @returns {User} - The user.
     */
    getInfo: builder.query<User, { id: number }>({
      query: ({ id }) => ({
        url: `getOneUser?UserID=${id}`,
        headers: {
          authorization: "Bearer " + getLocalStorageToken() || "",
        },
      }),
    }),
    /**
     * Get all users.
     * @returns {User[]} - All users.
     */
    getAll: builder.query<User[], void>({
      query: () => ({
        url: "getAllUsers",
        headers: {
          authorization: "Bearer " + getLocalStorageToken() || "",
        },
      }),
    }),
    /**
     * Delete a user.
     * @param {number} UserID - The id of the user.
     * @returns {string} - The message.
     */
    deleteUser: builder.mutation<string, { UserID: number }>({
      query: ({ UserID }) => ({
        url: `deleteUser?UserID=${UserID}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + getLocalStorageToken() || "",
        },
      }),
    }),
    /**
     * Update a user.
     * @param {UpdateUser} data - The user's new data.
     * @returns {User} - The user.
     */
    updateUser: builder.mutation<User, UpdateUser>({
      query: (data) => ({
        url: `updateUser`,
        method: "PUT",
        body: data,
        headers: {
          authorization: "Bearer " + getLocalStorageToken() || "",
        },
      }),
    }),
  }),
});

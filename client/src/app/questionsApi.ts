import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { QuestionFromServer, QuestionWithUser } from "../types";
import { store } from "./store";

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionWithUser[], void>({
      query: () => ({
        url: `questions/getAllQuestions`,
      }),
      transformResponse: (response: { data: QuestionFromServer[] }) => {
        const transformedResponse: QuestionWithUser[] = response.data.map(
          (question) => {
            const likedByUser = question.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = question.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              QuestionID: question.QuestionID,
              Title: question.Title,
              Content: question.Content,
              CreatedAt: question.CreatedAt,
              CreatedBy: question.CreatedBy,
              LikesNb: question.LikesNb,
              CommentsNb: question._count.Replies,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
            };
          }
        );
        return transformedResponse;
      },
    }),
    getQuestionsWithFilter: builder.query<
      QuestionWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) => ({
        url: `questions/getAllWithFilter?q=${q}&search=${search}`,
      }),
      transformResponse: (response: { data: QuestionFromServer[] }) => {
        const transformedResponse: QuestionWithUser[] = response.data.map(
          (question) => {
            const likedByUser = question.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = question.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              QuestionID: question.QuestionID,
              Title: question.Title,
              Content: question.Content,
              CreatedAt: question.CreatedAt,
              CreatedBy: question.CreatedBy,
              LikesNb: question.LikesNb,
              CommentsNb: question._count.Replies,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
            };
          }
        );
        return transformedResponse;
      },
    }),
    likeQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `questions/likeQuestion?QuestionID=${QuestionID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unlikeQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `questions/unlikeQuestion?QuestionID=${QuestionID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    saveQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `questions/saveQuestion?QuestionID=${QuestionID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unsaveQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `questions/unsaveQuestion?QuestionID=${QuestionID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    createQuestion: builder.mutation<
      string,
      {
        Title: string;
        Content: string;
        CreatedAt: string;
        CreatorID: number;
      }
    >({
      query: ({ Title, Content, CreatedAt, CreatorID }) => ({
        url: `questions/create`,
        method: "POST",
        body: {
          Title,
          Content,
          CreatedAt,
          CreatorID: CreatorID,
        },
      }),
    }),
    getOneQuestion: builder.query<QuestionWithUser, { QuestionID: number }>({
      query: ({ QuestionID }) => ({
        url: `questions/getOne?QuestionID=${QuestionID}`,
      }),
      transformResponse: (response: { data: QuestionFromServer }) => {
        const transformedResponse: QuestionWithUser = {
          QuestionID: response.data.QuestionID,
          Title: response.data.Title,
          Content: response.data.Content,
          CreatedAt: response.data.CreatedAt,
          CreatedBy: response.data.CreatedBy,
          LikesNb: response.data.LikesNb,
          CommentsNb: response.data._count.Replies,
          likedByUser: response.data.Likes.some(
            (like) => like.UserID === store.getState().user.user?.UserID
          ),
          savedByUser: response.data.Saved.some(
            (save) => save.UserID === store.getState().user.user?.UserID
          ),
        };
        return transformedResponse;
      },
    }),
  }),
});

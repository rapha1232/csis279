import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ReplyFromServer, ReplyWithUser } from "../types";
import { store } from "./store";

export const repliesApi = createApi({
  reducerPath: "repliesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (builder) => ({
    getQuestionRepliesWithFilter: builder.query<
      ReplyWithUser[],
      { q: string; QuestionID: number }
    >({
      query: ({ q, QuestionID }) => ({
        url: `replies/getAllWithFilter?q=${q}&QuestionID=${QuestionID}`,
      }),
      transformResponse: (response: { data: ReplyFromServer[] }) => {
        const transformedResponse: ReplyWithUser[] = response.data.map(
          (reply) => {
            const likedByUser = reply.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            return {
              ReplyID: reply.ReplyID,
              Content: reply.Content,
              CreatedAt: reply.CreatedAt,
              CreatorID: reply.CreatorID,
              QuestionID: reply.QuestionID,
              LikesNB: reply.LikesNB,
              CreatedBy: reply.CreatedBy,
              likedByUser: likedByUser,
            };
          }
        );
        return transformedResponse;
      },
    }),
    getTopicRepliesWithFilter: builder.query<
      ReplyWithUser[],
      { q: string; TopicID: number }
    >({
      query: ({ q, TopicID }) => ({
        url: `replies/getAllWithFilter?q=${q}&TopicID=${TopicID}`,
      }),
      transformResponse: (response: { data: ReplyFromServer[] }) => {
        const transformedResponse: ReplyWithUser[] = response.data.map(
          (reply) => {
            const likedByUser = reply.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            return {
              ReplyID: reply.ReplyID,
              Content: reply.Content,
              CreatedAt: reply.CreatedAt,
              CreatorID: reply.CreatorID,
              TopicID: reply.TopicID,
              LikesNB: reply.LikesNB,
              CreatedBy: reply.CreatedBy,
              likedByUser: likedByUser,
            };
          }
        );
        return transformedResponse;
      },
    }),
    likeReply: builder.mutation<boolean, { UserID: number; ReplyID: number }>({
      query: ({ UserID, ReplyID }) => ({
        url: `replies/likeReply?ReplyID=${ReplyID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unlikeReply: builder.mutation<boolean, { UserID: number; ReplyID: number }>(
      {
        query: ({ UserID, ReplyID }) => ({
          url: `replies/unlikeReply?ReplyID=${ReplyID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
    createQuestionReply: builder.mutation<
      string,
      {
        Content: string;
        CreatedAt: string;
        CreatorID: number;
        QuestionID: number;
      }
    >({
      query: ({ Content, CreatedAt, CreatorID, QuestionID }) => ({
        url: `replies/createQuestionReply`,
        method: "POST",
        body: {
          Content,
          CreatedAt,
          CreatorID: CreatorID,
          QuestionID: QuestionID,
        },
      }),
    }),
    createTopicReply: builder.mutation<
      string,
      {
        Content: string;
        CreatedAt: string;
        CreatorID: number;
        TopicID: number;
      }
    >({
      query: ({ Content, CreatedAt, CreatorID, TopicID }) => ({
        url: `replies/createTopicReply`,
        method: "POST",
        body: {
          Content,
          CreatedAt,
          CreatorID: CreatorID,
          TopicID: TopicID,
        },
      }),
    }),
  }),
});

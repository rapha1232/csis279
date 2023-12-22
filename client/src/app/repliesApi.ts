import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ReplyFromServer, ReplyWithUser, UpdateReply } from "../types";
import { getLocalStorageToken } from "../utils/localStorageUtils";
import { store } from "./store";

/**
 * API configuration for replies.
 */
export const repliesApi = createApi({
  reducerPath: "repliesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/replies/",
    prepareHeaders: (headers) => {
      const token = getLocalStorageToken();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    /**
     * Fetch all replies for a question.
     * @param {number} QuestionID - The ID of the question.
     * @param {string} search - Search Parameter
     * @param {string} q - Query Parameter
     * @returns {ReplyWithUser[]} - The replies with the users who created them.
     */
    getQuestionRepliesWithFilter: builder.query<
      ReplyWithUser[],
      { q: string; QuestionID: number }
    >({
      query: ({ q, QuestionID }) => ({
        url: `getAllRepliesForQuestionWithFilters?q=${q}&QuestionID=${QuestionID}`,
      }),
      transformResponse: (response: ReplyFromServer[]) => {
        const transformedResponse: ReplyWithUser[] = response.map((reply) => {
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
        });
        return transformedResponse;
      },
    }),
    /**
     * Fetch all replies for a topic.
     * @param {number} TopicID - The ID of the topiv.
     * @param {string} search - Search Parameter
     * @param {string} q - Query Parameter
     * @returns {ReplyWithUser[]} - The replies with the users who created them.
     */
    getTopicRepliesWithFilter: builder.query<
      ReplyWithUser[],
      { q: string; TopicID: number }
    >({
      query: ({ q, TopicID }) => ({
        url: `getAllRepliesForTopicWithFilters?q=${q}&TopicID=${TopicID}`,
      }),
      transformResponse: (response: ReplyFromServer[]) => {
        const transformedResponse: ReplyWithUser[] = response.map((reply) => {
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
        });
        return transformedResponse;
      },
    }),
    /**
     * Like a reply.
     * @param {number} UserID - The ID of the user.
     * @param {number} ReplyID - The ID of the reply.
     * @returns {void}
     */
    likeReply: builder.mutation<void, { UserID: number; ReplyID: number }>({
      query: ({ UserID, ReplyID }) => ({
        url: `likeReply`,
        method: "POST",
        body: {
          UserID: UserID,
          ReplyID: ReplyID,
        },
      }),
    }),
    /**
     * Unlike a reply.
     * @param {number} UserID - The ID of the user.
     * @param {number} ReplyID - The ID of the reply.
     * @returns {void}
     */
    unlikeReply: builder.mutation<void, { UserID: number; ReplyID: number }>({
      query: ({ UserID, ReplyID }) => ({
        url: `unlikeReply`,
        method: "POST",
        body: {
          UserID: UserID,
          ReplyID: ReplyID,
        },
      }),
    }),
    /**
     * Create a reply for a question.
     * @param {string} Content - The content of the reply.
     * @param {string} CreatedAt - The date of creation of the reply.
     * @param {number} CreatorID - The ID of the user who created the reply.
     * @param {number} TargetID - The ID of the question.
     * @returns {string} - The message from the server.
     */
    createQuestionReply: builder.mutation<
      string,
      {
        Content: string;
        CreatedAt: string;
        CreatorID: number;
        TargetID: number;
      }
    >({
      query: ({ Content, CreatedAt, CreatorID, TargetID }) => ({
        url: `createReplyForQuestion`,
        method: "POST",
        body: {
          Content: Content,
          CreatedAt: CreatedAt,
          CreatorID: CreatorID,
          TargetID: TargetID,
        },
      }),
    }),
    /**
     * Create a reply for a topic.
     * @param {string} Content - The content of the reply.
     * @param {string} CreatedAt - The date of creation of the reply.
     * @param {number} CreatorID - The ID of the user who created the reply.
     * @param {number} TargetID - The ID of the topic.
     * @returns {string} - The message from the server.
     */
    createTopicReply: builder.mutation<
      string,
      {
        Content: string;
        CreatedAt: string;
        CreatorID: number;
        TargetID: number;
      }
    >({
      query: ({ Content, CreatedAt, CreatorID, TargetID }) => ({
        url: `createReplyForTopic`,
        method: "POST",
        body: {
          Content: Content,
          CreatedAt: CreatedAt,
          CreatorID: CreatorID,
          TargetID: TargetID,
        },
      }),
    }),
    /**
     * Delete a reply.
     * @param {number} ReplyID - The ID of the reply.
     * @returns {void}
     */
    deleteReply: builder.mutation<void, { ReplyID: number }>({
      query: ({ ReplyID }) => ({
        url: `deleteReply?ReplyID=${ReplyID}`,
        method: "DELETE",
      }),
    }),
    /**
     * Update a reply
     * @param {number} ReplyID - The ID of the reply.
     * @param {UpdateReply} data - The content of the update.
     * @returns {ReplyFromServer} - The reply from the server.
     */
    updateReply: builder.mutation<ReplyFromServer, UpdateReply>({
      query: (data) => ({
        url: `updateReply`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

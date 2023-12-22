import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  DiscussionTopicFromServer,
  DiscussionTopicWithUser,
  UpdateTopic,
} from "../types";
import { getLocalStorageToken } from "../utils/localStorageUtils";
import { store } from "./store";

/**
 * API configuration for discussions.
 */
export const discussionApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/discussions/",
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
     * Fetch all discussion topics.
     * @returns {DiscussionTopicWithUser[]} - The topics with the users who created them.
     */
    getTopics: builder.query<DiscussionTopicWithUser[], void>({
      query: () => ({
        url: `getAllTopics`,
      }),
      transformResponse: (response: DiscussionTopicFromServer[]) => {
        const transformedResponse: DiscussionTopicWithUser[] = response.map(
          (topic) => {
            const likedByUser = topic.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = topic.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              TopicID: topic.TopicID,
              Title: topic.Title,
              Content: topic.Content,
              CreatedAt: topic.CreatedAt,
              CreatedBy: topic.CreatedBy,
              LikesNb: topic.LikesNb,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
              CommentsNb: topic._count.Replies,
            };
          }
        );
        return transformedResponse;
      },
    }),
    /**
     * Fetch discussion topics with filters.
     * @param {string} q - Query parameter.
     * @param {string} search - Search parameter.
     * @returns {DiscussionTopicWithUser[]} - The topics with the users who created them.
     */
    getTopicsWithFilter: builder.query<
      DiscussionTopicWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) => ({
        url: `getAllTopicsWithFilters?q=${q}&search=${search}`,
      }),
      transformResponse: (response: DiscussionTopicFromServer[]) => {
        const transformedResponse: DiscussionTopicWithUser[] = response.map(
          (topic) => {
            const likedByUser = topic.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = topic.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              TopicID: topic.TopicID,
              Title: topic.Title,
              Content: topic.Content,
              CreatedAt: topic.CreatedAt,
              CreatedBy: topic.CreatedBy,
              LikesNb: topic.LikesNb,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
              CommentsNb: topic._count.Replies,
            };
          }
        );
        return transformedResponse;
      },
    }),
    /**
     * Like a discussion topic.
     * @param {number} UserID - Id of the user.
     * @param {number} TopicID - Id of the topic.
     * @returns {boolean} - True if the topic was liked, false otherwise.
     */
    likeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `likeTopic`,
        method: "POST",
        body: {
          UserID: UserID,
          TopicID: TopicID,
        },
      }),
    }),
    /**
     * Unlike a discussion topic.
     * @param {number} UserID - Id of the user.
     * @param {number} TopicID - Id of the topic.
     * @returns {boolean} - True if the topic was unliked, false otherwise.
     */
    unlikeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `unlikeTopic`,
          method: "POST",
          body: {
            UserID: UserID,
            TopicID: TopicID,
          },
        }),
      }
    ),
    /**
     * Save a discussion topic.
     *  @param {number} UserID - Id of the user.
     * @param {number} TopicID - Id of the topic.
     * @returns {boolean} - True if the topic was saved, false otherwise.
     */
    saveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `saveTopic`,
        method: "POST",
        body: {
          UserID: UserID,
          TopicID: TopicID,
        },
      }),
    }),
    /**
     * Unsave a discussion topic.
     * @param {number} UserID - Id of the user.
     * @param {number} TopicID - Id of the topic.
     * @returns {boolean} - True if the topic was unsaved, false otherwise.
     */
    unsaveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `unsaveTopic`,
          method: "POST",
          body: {
            UserID: UserID,
            TopicID: TopicID,
          },
        }),
      }
    ),
    /**
     * create a new discussion topic.
     * @param {string} Title - Title of the topic
     * @param {string} Content - Content of the topic.
     * @param {string} CreatedAt - Timestamp of the topic.
     * @param {number} CreatorID - Id of the creator.
     * @returns {string} - Message from the server.
     */
    createTopic: builder.mutation<
      string,
      {
        Title: string;
        Content: string;
        CreatedAt: string;
        CreatorID: number;
      }
    >({
      query: ({ Title, Content, CreatedAt, CreatorID }) => ({
        url: `createTopic`,
        method: "POST",
        body: {
          Title: Title,
          Content: Content,
          CreatedAt: CreatedAt,
          CreatorID: CreatorID,
        },
      }),
    }),
    /**
     * get a specific a discussion topic.
     * @param {number} TopicID - Id of the topic.
     * @returns {DiscussionTopicWithUser} - The topic with the user who created it.
     */
    getOneTopic: builder.query<DiscussionTopicWithUser, { TopicID: number }>({
      query: ({ TopicID }) => ({
        url: `getOneTopic?TopicID=${TopicID}`,
      }),
      transformResponse: (response: DiscussionTopicFromServer) => {
        const transformedResponse: DiscussionTopicWithUser = {
          TopicID: response.TopicID,
          Title: response.Title,
          Content: response.Content,
          CreatedAt: response.CreatedAt,
          CreatedBy: response.CreatedBy,
          LikesNb: response.LikesNb,
          CommentsNb: response._count.Replies,
          likedByUser: response.Likes.some(
            (like) => like.UserID === store.getState().user.user?.UserID
          ),
          savedByUser: response.Saved.some(
            (save) => save.UserID === store.getState().user.user?.UserID
          ),
        };
        return transformedResponse;
      },
    }),
    /**
     * delete a discussion topic.
     * @param {number} TopicID - Id of the topic.
     * @returns {void}
     */
    deleteTopic: builder.mutation<void, { TopicID: number }>({
      query: ({ TopicID }) => ({
        url: `deleteTopic?TopicID=${TopicID}`,
        method: "DELETE",
      }),
    }),
    /**
     * Update a discussion topic.
     * @param {UpdateTopic} - Data to update the topic.
     * @returns {DiscussionTopicFromServer} - The updated topic.
     */
    updateTopic: builder.mutation<DiscussionTopicFromServer, UpdateTopic>({
      query: (data) => ({
        url: `updateTopic`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

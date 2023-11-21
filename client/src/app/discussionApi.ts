import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DiscussionTopicFromServer, DiscussionTopicWithUser } from "../types";
import { store } from "./store";

export const discussionApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (builder) => ({
    getTopics: builder.query<DiscussionTopicWithUser[], void>({
      query: () => ({
        url: `discussions/getAllTopics`,
      }),
      transformResponse: (response: { data: DiscussionTopicFromServer[] }) => {
        const transformedResponse: DiscussionTopicWithUser[] =
          response.data.map((topic) => {
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
          });
        return transformedResponse;
      },
    }),
    getTopicsWithFilter: builder.query<
      DiscussionTopicWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) => ({
        url: `discussions/getAllWithFilter?q=${q}&search=${search}`,
      }),
      transformResponse: (response: { data: DiscussionTopicFromServer[] }) => {
        const transformedResponse: DiscussionTopicWithUser[] =
          response.data.map((topic) => {
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
          });
        return transformedResponse;
      },
    }),
    likeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `discussions/likeTopic?TopicID=${TopicID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unlikeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `discussions/unlikeTopic?TopicID=${TopicID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
    saveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `discussions/saveTopic?TopicID=${TopicID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unsaveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `discussions/unsaveTopic?TopicID=${TopicID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
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
        url: `discussions/create`,
        method: "POST",
        body: {
          Title,
          Content,
          CreatedAt,
          CreatorID: CreatorID,
        },
      }),
    }),
    getOneTopic: builder.query<DiscussionTopicWithUser, { TopicID: number }>({
      query: ({ TopicID }) => ({
        url: `discussions/getOne?TopicID=${TopicID}`,
      }),
      transformResponse: (response: { data: DiscussionTopicFromServer }) => {
        const transformedResponse: DiscussionTopicWithUser = {
          TopicID: response.data.TopicID,
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

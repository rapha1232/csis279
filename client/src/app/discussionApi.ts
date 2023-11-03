import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DiscussionTopicWithUser } from "../types";

export const discussionApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getTopics: builder.query<DiscussionTopicWithUser[], number>({
      query: (UserID) => `discussionTopic/getAll?UserID=${UserID}`,
      transformResponse: (response: DiscussionTopicWithUser[]) => {
        const topics = response;
        const transformedResponse = topics.map((topic) => {
          topic.likedByUser = Number(topic.likedByUser) === 1;
          topic.savedByUser = Number(topic.savedByUser) === 1;
          return topic;
        });

        return transformedResponse;
      },
    }),
    getTopicsWithFilter: builder.query<
      DiscussionTopicWithUser[],
      { UserID: number; q: string; search: string }
    >({
      query: ({ UserID, q, search }) =>
        `discussionTopic/getAllWithFilter?UserID=${UserID}&q=${q}&search=${search}`,
      transformResponse: (response: DiscussionTopicWithUser[]) => {
        const topics = response;
        const transformedResponse = topics.map((topic) => {
          topic.likedByUser = Number(topic.likedByUser) === 1;
          topic.savedByUser = Number(topic.savedByUser) === 1;
          return topic;
        });

        return transformedResponse;
      },
    }),
    likeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `discussionTopic/like?TopicID=${TopicID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unlikeTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `discussionTopic/unlike?TopicID=${TopicID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
    saveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>({
      query: ({ UserID, TopicID }) => ({
        url: `discussionTopic/save?TopicID=${TopicID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unsaveTopic: builder.mutation<boolean, { UserID: number; TopicID: number }>(
      {
        query: ({ UserID, TopicID }) => ({
          url: `discussionTopic/unsave?TopicID=${TopicID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
  }),
});

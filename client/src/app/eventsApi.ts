import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { EventWithUser } from "../types";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getEvents: builder.query<EventWithUser[], number>({
      query: (UserID) => `events/getAll?UserID=${UserID}`,
      transformResponse: (response: EventWithUser[]) => {
        const events = response;
        const transformedResponse = events.map((event) => {
          event.likedByUser = Number(event.likedByUser) === 1;
          event.savedByUser = Number(event.savedByUser) === 1;
          return event;
        });

        return transformedResponse;
      },
    }),
    getEventsWithFilter: builder.query<
      EventWithUser[],
      { UserID: number; q: string; search: string }
    >({
      query: ({ UserID, q, search }) =>
        `events/getAllWithFilter?UserID=${UserID}&q=${q}&search=${search}`,
      transformResponse: (response: EventWithUser[]) => {
        const events = response;
        const transformedResponse = events.map((event) => {
          event.likedByUser = Number(event.likedByUser) === 1;
          event.savedByUser = Number(event.savedByUser) === 1;
          return event;
        });

        return transformedResponse;
      },
    }),
    likeEvent: builder.mutation<boolean, { UserID: number; EventID: number }>({
      query: ({ UserID, EventID }) => ({
        url: `events/like?EventID=${EventID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unlikeEvent: builder.mutation<boolean, { UserID: number; EventID: number }>(
      {
        query: ({ UserID, EventID }) => ({
          url: `events/unlike?EventID=${EventID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
    saveEvent: builder.mutation<boolean, { UserID: number; EventID: number }>({
      query: ({ UserID, EventID }) => ({
        url: `events/save?EventID=${EventID}&UserID=${UserID}`,
        method: "POST",
      }),
    }),
    unsaveEvent: builder.mutation<boolean, { UserID: number; EventID: number }>(
      {
        query: ({ UserID, EventID }) => ({
          url: `events/unsave?EventID=${EventID}&UserID=${UserID}`,
          method: "POST",
        }),
      }
    ),
  }),
});

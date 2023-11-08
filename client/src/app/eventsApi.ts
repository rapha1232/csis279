import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { EventFromServer, EventWithUser } from "../types";
import { store } from "./store";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getEvents: builder.query<EventWithUser[], void>({
      query: () => `events/getAll`,
      transformResponse: (response: { data: EventFromServer[] }) => {
        const transformedResponse: EventWithUser[] = response.data.map(
          (event) => {
            const likedByUser = event.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = event.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              EventID: event.EventID,
              Title: event.Title,
              Description: event.Description,
              Date: event.Date,
              Location: event.Location,
              CreatedBy: event.CreatedBy,
              LikesNB: event.LikesNB,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
            };
          }
        );
        return transformedResponse;
      },
    }),
    getEventsWithFilter: builder.query<
      EventWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) =>
        `events/getAllWithFilter?q=${q}&search=${search}`,
      transformResponse: (response: { data: EventFromServer[] }) => {
        const transformedResponse: EventWithUser[] = response.data.map(
          (event) => {
            const likedByUser = event.Likes.some(
              (like) => like.UserID === store.getState().user.user?.UserID
            );
            const savedByUser = event.Saved.some(
              (save) => save.UserID === store.getState().user.user?.UserID
            );
            return {
              EventID: event.EventID,
              Title: event.Title,
              Description: event.Description,
              Date: event.Date,
              Location: event.Location,
              CreatedBy: event.CreatedBy,
              LikesNB: event.LikesNB,
              likedByUser: likedByUser,
              savedByUser: savedByUser,
            };
          }
        );
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
    createEvent: builder.mutation<
      string,
      {
        Title: string;
        Description: string;
        Date: string;
        Location: string;
        CreatorID: number;
      }
    >({
      query: ({ Title, Description, Date, Location, CreatorID }) => ({
        url: `events/create`,
        method: "POST",
        body: {
          Title,
          Description,
          Date,
          Location,
          CreatorID: CreatorID,
        },
      }),
    }),
  }),
});

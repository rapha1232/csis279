import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { EventFromServer, EventWithUser, UpdateEvent } from "../types";
import { getLocalStorageToken } from "../utils/localStorageUtils";
import { store } from "./store";

/**
 * API configuration for events.
 */
export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/events/",
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
     * Fetch all events.
     * @returns {EventWithUser[]} - The events with the users who created them.
     */
    getEvents: builder.query<EventWithUser[], void>({
      query: () => ({
        url: `getAllEvents`,
      }),
      transformResponse: (response: EventFromServer[]) => {
        const transformedResponse: EventWithUser[] = response.map((event) => {
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
        });
        return transformedResponse;
      },
    }),
    /**
     * Fetch all events with a filter.
     * @param {string} q - The filter to apply.
     * @param {string} search - The search to apply.
     * @returns {EventWithUser[]} - The events with the users who created them.
     */
    getEventsWithFilter: builder.query<
      EventWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) => ({
        url: `getAllEventsWithFilters?q=${q}&search=${search}`,
      }),
      transformResponse: (response: EventFromServer[]) => {
        const transformedResponse: EventWithUser[] = response.map((event) => {
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
        });
        return transformedResponse;
      },
    }),
    /**
     * Like an event.
     * @param {number} UserID - The id of the user.
     * @param {number} EventID - The id of the event.
     * @returns {boolean} - True if liked false otherwise.
     */
    likeEvent: builder.mutation<boolean, { UserID: number; EventID: number }>({
      query: ({ UserID, EventID }) => ({
        url: `likeEvent`,
        method: "POST",
        body: {
          UserID: UserID,
          EventID: EventID,
        },
      }),
    }),
    /**
     * Unlike an event.
     * @param {number} UserID - The id of the user.
     * @param {number} EventID - The id of the event.
     * @returns {boolean} - True if unliked false otherwise.
     */
    unlikeEvent: builder.mutation<boolean, { UserID: number; EventID: number }>(
      {
        query: ({ UserID, EventID }) => ({
          url: `unlikeEvent`,
          method: "POST",
          body: {
            UserID: UserID,
            EventID: EventID,
          },
        }),
      }
    ),
    /**
     * Save an event.
     * @param {number} UserID - The id of the user.
     * @param {number} EventID - The id of the event.
     * @returns {boolean} - True if saved false otherwise.
     */
    saveEvent: builder.mutation<boolean, { UserID: number; EventID: number }>({
      query: ({ UserID, EventID }) => ({
        url: `saveEvent`,
        method: "POST",
        body: {
          UserID: UserID,
          EventID: EventID,
        },
      }),
    }),
    /**
     * Unsave an event.
     * @param {number} UserID - The id of the user.
     * @param {number} EventID - The id of the event.
     * @returns {boolean} - True if unsaved false otherwise.
     */
    unsaveEvent: builder.mutation<boolean, { UserID: number; EventID: number }>(
      {
        query: ({ UserID, EventID }) => ({
          url: `unsaveEvent`,
          method: "POST",
          body: {
            UserID: UserID,
            EventID: EventID,
          },
        }),
      }
    ),
    /**
     * Create an event.
     * @param {string} Title - The title of the event.
     * @param {string} Description - The description of the event.
     * @param {string} Date - The date of the event.
     * @param {string} Location - The location of the event.
     * @param {number} CreatorID - The id of the creator.
     * @returns {string} - The message.
     */
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
        url: `createEvent`,
        method: "POST",
        body: {
          Title: Title,
          Description: Description,
          Date: Date,
          Location: Location,
          CreatorID: CreatorID,
        },
      }),
    }),
    /**
     * Delete an event.
     * @param {number} EventID - The id of the event.
     * @returns {void}
     */
    deleteEvent: builder.mutation<void, { EventID: number }>({
      query: ({ EventID }) => ({
        url: `deleteEvent?EventID=${EventID}`,
        method: "DELETE",
      }),
    }),
    /**
     * Update an event.
     * @param {EventFromServer} data - The event to update.
     * @returns {EventFromServer} - The updated event.
     */
    updateEvent: builder.mutation<EventFromServer, UpdateEvent>({
      query: (data) => ({
        url: `updateEvent`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

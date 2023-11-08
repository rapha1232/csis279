import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { APOD, Article } from "../types";

export const nasaApi = createApi({
  reducerPath: "nasaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nasa.gov/",
  }),
  endpoints: (builder) => ({
    apod: builder.query<APOD, void>({
      query: () => ({
        url: "planetary/apod",
        method: "GET",
        params: {
          api_key: "N72S1RDGFId1fKys92IKADcTYbDWKTkFhsSTbW0g",
        },
      }),
    }),
  }),
});

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spaceflightnewsapi.net/v4/articles/",
  }),
  endpoints: (builder) => ({
    articles: builder.query<Article[], void>({
      query: () => ({
        url: "",
        method: "GET",
        params: {
          limit: "8",
        },
      }),
      transformResponse: (response: {
        count: number;
        next?: string;
        previous?: string;
        results: Article[];
      }) => {
        return response.results;
      },
    }),
  }),
});

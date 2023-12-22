import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { QuestionFromServer, QuestionWithUser, UpdateQuestion } from "../types";
import { getLocalStorageToken } from "../utils/localStorageUtils";
import { store } from "./store";

/**
 * API configuration for questions.
 */
export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/questions/",
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
     * Fetch all questions.
     * @returns {QuestionWithUser[]} - The questions with the users who created them.
     */
    getQuestions: builder.query<QuestionWithUser[], void>({
      query: () => ({
        url: `getAllQuestions`,
      }),
      transformResponse: (response: QuestionFromServer[]) => {
        const transformedResponse: QuestionWithUser[] = response.map(
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
    /**
     * Fetch all questions with a filter.
     * @param {string} q - The filter to apply.
     * @param {string} search - The search to apply.
     * @returns {QuestionWithUser[]} - The questions with the users who created them.
     */
    getQuestionsWithFilter: builder.query<
      QuestionWithUser[],
      { q: string; search: string }
    >({
      query: ({ q, search }) => ({
        url: `getAllQuestionsWithFilters?q=${q}&search=${search}`,
      }),
      transformResponse: (response: QuestionFromServer[]) => {
        const transformedResponse: QuestionWithUser[] = response.map(
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
    /**
     * Like a question.
     * @param {number} UserID - Id of the user.
     * @param {number} Question - Id of the question.
     * @returns {boolean} - True if the question was liked, false otherwise.
     */
    likeQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `likeQuestion`,
        method: "POST",
        body: {
          UserID: UserID,
          QuestionID: QuestionID,
        },
      }),
    }),
    /**
     * Unlike a question.
     * @param {number} UserID - Id of the user.
     * @param {number} Question - Id of the question.
     * @returns {boolean} - True if the question was unliked, false otherwise.
     */
    unlikeQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `unlikeQuestion`,
        method: "POST",
        body: {
          UserID: UserID,
          QuestionID: QuestionID,
        },
      }),
    }),
    /**
     * Save a question.
     *  @param {number} UserID - Id of the user.
     *  @param {number} QuestionID - Id of the question.
     *  @returns {boolean} - True if the question was saved, false otherwise.
     */
    saveQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `saveQuestion`,
        method: "POST",
        body: {
          UserID: UserID,
          QuestionID: QuestionID,
        },
      }),
    }),
    /**
     * Unsave a question.
     * @param {number} UserID - Id of the user.
     * @param {number} QuestionID - Id of the question.
     * @returns {boolean} - True if the question was unsaved, false otherwise.
     */
    unsaveQuestion: builder.mutation<
      boolean,
      { UserID: number; QuestionID: number }
    >({
      query: ({ UserID, QuestionID }) => ({
        url: `unsaveQuestion`,
        method: "POST",
        body: {
          UserID: UserID,
          QuestionID: QuestionID,
        },
      }),
    }),
    /**
     * Create a question.
     * @param {string} Title - Title of the question.
     * @param {string} Content - Content of the question.
     * @param {string} CreatedAt - Date of creation of the question.
     * @param {number} CreatorID - Id of the creator of the question.
     * @returns {string} - The message from the server.
     */
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
        url: `createQuestion`,
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
     * Get one question.
     * @param {number} QuestionID - Id of the question.
     * @returns {QuestionWithUser} - The question with the user who created it.
     */
    getOneQuestion: builder.query<QuestionWithUser, { QuestionID: number }>({
      query: ({ QuestionID }) => ({
        url: `getOneQuestion?QuestionID=${QuestionID}`,
      }),
      transformResponse: (response: QuestionFromServer) => {
        const transformedResponse: QuestionWithUser = {
          QuestionID: response.QuestionID,
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
     * Delete a question.
     * @param {number} QuestionID - Id of the question.
     * @returns {void}
     */
    deleteQuestion: builder.mutation<void, { QuestionID: number }>({
      query: ({ QuestionID }) => ({
        url: `deleteQuestion?QuestionID=${QuestionID}`,
        method: "DELETE",
      }),
    }),
    /**
     * Update a question.
     * @param {number} QuestionID - Id of the question.
     * @param {UpdateQuestion} - Data to update question.
     * @returns {QuestionWithUser} - The updated question.
     */
    updateQuestion: builder.mutation<QuestionFromServer, UpdateQuestion>({
      query: (data) => ({
        url: `updateQuestion`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

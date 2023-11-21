import {
  Action,
  PayloadAction,
  ThunkAction,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../types/index";
import { discussionApi } from "./discussionApi";
import { eventsApi } from "./eventsApi";
import { questionsApi } from "./questionsApi";
import { repliesApi } from "./repliesApi";
import { articlesApi, nasaApi } from "./spaceApis";
import { userApi } from "./userApi";

interface UserState {
  user: User | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: { user: null } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

const cookieSlice = createSlice({
  name: "cookie",
  initialState: "",
  reducers: {
    setCookie: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    clearCookie: (state) => {
      return "";
    },
  },
});

const eventsSearch = createSlice({
  name: "eventsSearch",
  initialState: "",
  reducers: {
    setEventSearch: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

const topicsSearch = createSlice({
  name: "topicsSearch",
  initialState: "",
  reducers: {
    setTopicSearch: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

const questionsSearch = createSlice({
  name: "questionsSearch",
  initialState: "",
  reducers: {
    setQuestionSearch: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    eventSearch: eventsSearch.reducer,
    topicSearch: topicsSearch.reducer,
    questionsSearch: questionsSearch.reducer,
    cookie: cookieSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [discussionApi.reducerPath]: discussionApi.reducer,
    [nasaApi.reducerPath]: nasaApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(eventsApi.middleware)
      .concat(discussionApi.middleware)
      .concat(nasaApi.middleware)
      .concat(articlesApi.middleware)
      .concat(questionsApi.middleware)
      .concat(repliesApi.middleware),
});
export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useGetInfoQuery,
  useGetAllQuery,
} = userApi;
export const {
  useGetEventsQuery,
  useGetEventsWithFilterQuery,
  useLikeEventMutation,
  useUnlikeEventMutation,
  useSaveEventMutation,
  useUnsaveEventMutation,
  useCreateEventMutation,
} = eventsApi;
export const {
  useGetTopicsQuery,
  useGetTopicsWithFilterQuery,
  useLikeTopicMutation,
  useUnlikeTopicMutation,
  useSaveTopicMutation,
  useUnsaveTopicMutation,
  useCreateTopicMutation,
  useGetOneTopicQuery,
} = discussionApi;
export const {
  useCreateQuestionMutation,
  useGetQuestionsQuery,
  useLikeQuestionMutation,
  useUnlikeQuestionMutation,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation,
  useGetQuestionsWithFilterQuery,
  useGetOneQuestionQuery,
} = questionsApi;
export const {
  useGetQuestionRepliesWithFilterQuery,
  useGetTopicRepliesWithFilterQuery,
  useLikeReplyMutation,
  useUnlikeReplyMutation,
  useCreateQuestionReplyMutation,
  useCreateTopicReplyMutation,
} = repliesApi;
export const { useApodQuery } = nasaApi;
export const { useArticlesQuery } = articlesApi;
export const { setUser, clearUser } = userSlice.actions;
export const { setEventSearch } = eventsSearch.actions;
export const { setTopicSearch } = topicsSearch.actions;
export const { setQuestionSearch } = questionsSearch.actions;
export const { setCookie, clearCookie } = cookieSlice.actions;

export const EventInteractions = {
  like: useLikeEventMutation,
  unlike: useUnlikeEventMutation,
  save: useSaveEventMutation,
  unsave: useUnsaveEventMutation,
};

export const TopicInteractions = {
  like: useLikeTopicMutation,
  unlike: useUnlikeTopicMutation,
  save: useSaveTopicMutation,
  unsave: useUnsaveTopicMutation,
};

export const QuestionInteractions = {
  like: useLikeQuestionMutation,
  unlike: useUnlikeQuestionMutation,
  save: useSaveQuestionMutation,
  unsave: useUnsaveQuestionMutation,
};
export const ReplyInteractions = {
  like: useLikeReplyMutation,
  unlike: useUnlikeReplyMutation,
};

type LikeReplyMutation = ReturnType<typeof useLikeReplyMutation>;
type UnLikeReplyMutation = ReturnType<typeof useUnlikeReplyMutation>;

export type ReplyInteractions = LikeReplyMutation | UnLikeReplyMutation;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

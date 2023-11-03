import {
  configureStore,
  ThunkAction,
  Action,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../types/index";
import { userApi } from "./userApi";
import { eventsApi } from "./eventsApi";
import { discussionApi } from "./discussionApi";

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

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    eventSearch: eventsSearch.reducer,
    topicSearch: topicsSearch.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [discussionApi.reducerPath]: discussionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(eventsApi.middleware)
      .concat(discussionApi.middleware),
});
export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useGetInfoQuery,
} = userApi;
export const {
  useGetEventsQuery,
  useGetEventsWithFilterQuery,
  useLikeEventMutation,
  useUnlikeEventMutation,
  useSaveEventMutation,
  useUnsaveEventMutation,
} = eventsApi;
export const {
  useGetTopicsQuery,
  useGetTopicsWithFilterQuery,
  useLikeTopicMutation,
  useUnlikeTopicMutation,
  useSaveTopicMutation,
  useUnsaveTopicMutation,
} = discussionApi;
export const { setUser, clearUser } = userSlice.actions;
export const { setEventSearch } = eventsSearch.actions;
export const { setTopicSearch } = topicsSearch.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

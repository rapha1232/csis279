import {
  configureStore,
  ThunkAction,
  Action,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "../types/index";

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

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

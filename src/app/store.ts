//store.ts
import { configureStore, ThunkAction, Action, PayloadAction, createSlice } from '@reduxjs/toolkit';
import userReducer from '../models/user/userSlice';
import { User } from '../models/user/userModel';
import { UserState } from '../models/user/userReducer';

const textSlice = createSlice({
  name: 'text',
  initialState: '',
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: {user: null} as UserState,
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
    text: textSlice.reducer,
    user: userReducer,
  },
});

export const { setText } = textSlice.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

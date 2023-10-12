import { createReducer, createAction } from "@reduxjs/toolkit";
import { User } from "./userModel";

export const setUser = createAction<User>('user/setUser');
export const clearUser = createAction('user/clearUser');

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
    });
});

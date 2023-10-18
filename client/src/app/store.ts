import {
  configureStore,
  ThunkAction,
  Action,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { Cart, CartEntry, User } from "../types/index";

interface UserState {
  user: User | null;
}
interface CartState {
  cart: Cart | null;
}

const initialCart: Cart = {
  user_id: 0,
  products: [],
};

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

// Create a cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      return action.payload;
    },
    clearCart: (state) => {
      state.products = [];
    },
    setCartProducts: (state, action: PayloadAction<CartEntry[]>) => {
      state.products = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const { setCart, clearCart, setCartProducts } = cartSlice.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

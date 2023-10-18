// cartUtils.js
import axios from "axios";
import { setCart } from "../app/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const getCart = async (
  userId: number,
  dispatch: Dispatch<AnyAction>
) => {
  axios
    .get(`http://localhost:3001/getCart?userId=${userId}`)
    .then((res) => dispatch(setCart(res.data.cart)))
    .catch((err) => console.log(err));
};

export const addToCart = (
  productId: number,
  userId: number,
  q: number,
  setAdded: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>
) => {
  axios
    .post("http://localhost:3001/addToCart", { productId, userId, q })
    .then((res) => {
      if (res.data.success === true) setAdded(true);
      else setAdded(false);
    })
    .then(() => getCart(userId, dispatch))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteFromCart = (
  productId: number,
  userId: number,
  setAdded: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>
) => {
  axios
    .post(
      `http://localhost:3001/deleteFromCart?userId=${userId}&productId=${productId}`
    )
    .then((res) => {
      if (res.data.success === true) setAdded(false);
      else setAdded(true);
    })
    .then(() => getCart(userId, dispatch))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteInCart = (
  product_id: number,
  userId: number,
  dispatch: Dispatch<AnyAction>
) => {
  axios
    .post(
      `http://localhost:3001/deleteFromCart?userId=${userId}&productId=${product_id}`
    )
    .then(() => {
      getCart(userId, dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
};

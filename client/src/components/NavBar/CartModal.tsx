// CartModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import DarkTheme from "../DarkTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CartItem from "./CartItem";
import { getCart } from "../../utils/cartUtils";
import { ShoppingCart } from "./Icons";

const CartModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    // window.location.reload();
  };

  useEffect(() => {
    getCart(userId!, dispatch);
  }, [userId, dispatch]);

  return (
    <DarkTheme>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        color="inherit"
      >
        <ShoppingCart />
      </IconButton>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle alignSelf={"center"} variant="h3">
          Your Cart
        </DialogTitle>
        <DialogContent>
          {cart.products.length === 0 && (
            <DialogContentText id="alert-dialog-slide-description">
              Your cart is empty!
            </DialogContentText>
          )}
          {cart.products.length > 0 && (
            <DialogContent id="alert-dialog-slide-description">
              {cart.products.map((item) => (
                <CartItem product={item} key={item.cart_id} />
              ))}
            </DialogContent>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </DarkTheme>
  );
};

export default CartModal;

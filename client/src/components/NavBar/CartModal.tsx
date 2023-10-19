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
  Badge,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CartItem from "./CartItem";
import { getCart } from "../../utils/cartUtils";
import { ShoppingCart, VerticalAlignBottomIcon } from "./Icons";

const CartModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const cart = useSelector((state: RootState) => state.cart);
  const desktop = useMediaQuery("(min-width: 900px)");
  const dispatch = useDispatch();

  useEffect(() => {
    getCart(userId!, dispatch);
  }, [userId, dispatch]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "c" || event.key === "C") {
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        color="inherit"
        sx={{ gap: 1 }}
      >
        {desktop && (
          <Chip
            variant="outlined"
            color="default"
            size="small"
            label="C"
            icon={<VerticalAlignBottomIcon />}
          />
        )}
        <Badge color="error" badgeContent={cart.products.length}>
          <ShoppingCart />
        </Badge>
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
    </>
  );
};

export default CartModal;

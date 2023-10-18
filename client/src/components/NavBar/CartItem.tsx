// CartItem.jsx
import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { RiDeleteBin6Line } from "./Icons";
import { deleteInCart } from "../../utils/cartUtils";
import { CartEntry } from "../../types";
import { RootState } from "../../app/store"; // Import your cart slice action
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ product }: { product: CartEntry }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      borderBottom="1px solid lightblue"
      paddingBottom={"20px"}
      marginBottom="20px"
      gap={4}
    >
      <Box flex={1} gap={4}>
        <Box gap={2} display={"flex"}>
          <Typography variant="h5">{product.product.title}</Typography>
          <IconButton
            onClick={() =>
              deleteInCart(product.product.product_id, userId!, dispatch)
            }
          >
            <RiDeleteBin6Line size={20} />
          </IconButton>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="body1">
            Price: ${product.product.price}
          </Typography>
          <Typography variant="body1">
            Total: ${(product.quantity * product.product.price).toFixed(2)}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} gap={4} mt={2}>
          <Button disableElevation variant="outlined" onClick={() => {}}>
            -
          </Button>
          <Typography variant="body1">{product.quantity}</Typography>
          <Button disableElevation variant="outlined" onClick={() => {}}>
            +
          </Button>
        </Box>
      </Box>
      <img
        src={product.product.image}
        alt={product.product.title}
        style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
      />
    </Box>
  );
};

export default CartItem;

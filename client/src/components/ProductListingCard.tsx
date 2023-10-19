import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Listing } from "../types";
import Tag from "./Tag";
import { addToCart, deleteFromCart } from "../utils/cartUtils";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
interface Props {
  product: Listing;
  homeScreen?: boolean;
  handleDelete?: (product_id: number) => void;
  handleEdit?: (product_id: number) => void;
  onClick?: () => void;
}

const ProductListingCard = ({
  product,
  homeScreen = false,
  handleDelete,
  handleEdit,
  onClick,
}: Props) => {
  const [added, setAdded] = React.useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/checkCart?userId=${userId}&productId=${product.product_id}`
      )
      .then((res) => {
        setAdded(res.data.exists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [added, cart]);
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 500,
        cursor: onClick ? "pointer" : "",
      }}
      onClick={onClick}
    >
      <CardMedia sx={{ height: 300 }} image={product.image}></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" mb={2}>
          {product.title}
          <Typography variant="subtitle1">
            {product.price}$<br />
            <Tag id={product.category_id} />
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.description}
        </Typography>
        {homeScreen && (
          <Button
            size="small"
            variant="contained"
            color={added ? "error" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              added
                ? deleteFromCart(
                    product.product_id,
                    userId!,
                    setAdded,
                    dispatch
                  )
                : addToCart(product.product_id, userId!, 1, setAdded, dispatch);
            }}
          >
            {added ? "Delete From Cart" : "Add to Cart"}
          </Button>
        )}
      </CardContent>
      {!homeScreen && handleDelete && handleEdit && (
        <CardActions>
          <Button size="small" onClick={() => handleDelete(product.product_id)}>
            Delete
          </Button>
          <Button size="small" onClick={() => handleEdit(product.product_id)}>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProductListingCard;

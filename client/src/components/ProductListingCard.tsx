import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DarkTheme from "./DarkTheme";
interface Props {
  id: number;
  image: string;
  title: string;
  description: string;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}
const ProductListingCard = ({
  id,
  image,
  title,
  description,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <DarkTheme>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 300 }}
          component="image"
          image={image}
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleDelete(id)}>
            Delete
          </Button>
          <Button size="small" onClick={() => handleEdit(id)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </DarkTheme>
  );
};

export default ProductListingCard;

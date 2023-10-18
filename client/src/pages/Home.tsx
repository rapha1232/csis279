import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProductListingCard from "../components/ProductListingCard";
import axios from "axios";
import { Listing } from "../types";
import { handleClose } from "../utils/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<AlertColor>("success");
  const [featuredProducts, setFeaturedProducts] = useState<Listing[]>();
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getFeaturedProducts = () => {
    setTimeout(() => {
      axios
        .get("http://localhost:3001/featured-products")
        .then((response) => {
          if (response.data.listings.length > 0)
            setFeaturedProducts(response.data.listings);
        })
        .catch((error) => {
          console.error("Error fetching featured products:", error);
        });
    }, 2500);
  };

  useEffect(() => {
    if (location.state && location.state.open) {
      setOpen(true);
      setToastMessage(location.state.message);
      setToastType(location.state.type);
    }
  }, [location]);

  useEffect(() => {
    getFeaturedProducts();
  }, [dispatch]);
  return (
    <>
      <Container sx={{ pt: "75px" }}>
        <Box
          mt={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to NeighborMarket
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Discover a wide range of products and services at competitive
            prices. <br />
            Feel free to browse our listings or create your own after joining
            us!
          </Typography>
          <Button variant="contained" color="primary" href="/browse">
            Explore Products
          </Button>
        </Box>

        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Products
          </Typography>
          {featuredProducts ? (
            <Grid container spacing={3}>
              {featuredProducts.length > 0 &&
                featuredProducts.map((product) => (
                  <Grid
                    item
                    key={product.product_id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <ProductListingCard
                      product={product}
                      homeScreen={true}
                      onClick={() =>
                        navigate(`/product/${product.product_id}`, {
                          state: { userId: userId },
                        })
                      }
                    />
                  </Grid>
                ))}
              {featuredProducts.length === 0 && <p>No featured products</p>}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
                <Grid item key={product} xs={12} sm={6} md={4} lg={3}>
                  <Skeleton
                    variant="rectangular"
                    width={270}
                    height={530}
                    animation="wave"
                    sx={{ bgcolor: "grey.800" }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => handleClose(setOpen)}
      >
        <Alert
          onClose={() => handleClose(setOpen)}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;

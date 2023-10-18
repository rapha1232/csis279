import React, { useState, useEffect } from "react";
import ProductListingCard from "../components/ProductListingCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Listing } from "../types";
import { handleDelete, handleEdit } from "../utils/listingActionsUtils";

const MyListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/myListings?userId=${userId}`)
      .then((response) => setListings(response.data.listings))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <main>
        <Box
          sx={{
            pt: 4,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center">
              {listings.length === 0
                ? "No Listings Found"
                : `All Your Listings (${listings.length})`}
            </Typography>
          </Container>
        </Box>
        {listings.length > 0 && (
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              {listings.map((listing) => (
                <Grid item key={listing.product_id} xs={12} sm={6} md={4}>
                  <ProductListingCard
                    product={listing}
                    handleDelete={() =>
                      handleDelete(listing.product_id, setListings)
                    }
                    handleEdit={() => handleEdit(listing.product_id, navigate)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </div>
  );
};

export default MyListings;

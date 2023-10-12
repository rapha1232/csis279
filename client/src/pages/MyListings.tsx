import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ProductListingCard from "../components/ProductListingCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  datePosted: string;
}
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

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/deleteListing?listingId=${id}`)
      .then(() =>
        setListings((prevData) =>
          prevData.filter((listing) => listing.id !== id)
        )
      )
      .catch((error) => console.error(error));
  };

  const handleEdit = (id: number) => {
    // Make an Axios GET request to fetch the existing data for the product with the specified ID
    axios
      .get(`http://localhost:3001/getProductListing?listingId=${id}`)
      .then((response) => {
        const editData = response.data.listing;
        editData.id = id;
        const exists = true;
        navigate("/sell", { state: { editData } });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <NavBar />
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
                : "All Your Listings"}
            </Typography>
          </Container>
        </Box>
        {listings.length > 0 && (
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              {listings.map((listing) => (
                <Grid item key={listing.id} xs={12} sm={6} md={4}>
                  <ProductListingCard
                    id={listing.id}
                    title={listing.title}
                    description={listing.description}
                    image={listing.image}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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

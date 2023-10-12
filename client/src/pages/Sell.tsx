import React from "react";
import {
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import NavBar from "../components/NavBar";
import NewProductListingForm from "../components/SellForm";
import axios from "axios";

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  image: File | null;
}
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Sell = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <NavBar />
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "90vh" }} // Increase minHeight for a larger form area
          >
            <Grid item xs={12} sm={10} md={8}>
              {" "}
              {/* Adjust grid item sizes */}
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                  Sell a New Product
                </Typography>
                <NewProductListingForm />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Sell;

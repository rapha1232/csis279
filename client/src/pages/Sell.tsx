import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import NewProductListingForm from "../components/SellForm";
import DarkTheme from "../components/DarkTheme";

const Sell = () => {
  return (
    <DarkTheme>
      <div>
        <NavBar />
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "90vh" }}
          >
            <Grid item xs={12} sm={10} md={8}>
              {" "}
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
    </DarkTheme>
  );
};

export default Sell;

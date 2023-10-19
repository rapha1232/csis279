import React from "react";
import DarkTheme from "../components/DarkTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Browse from "./Browse";
import MyListings from "./MyListings";
import ProductPage from "./ProductPage";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import Sell from "./Sell";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <DarkTheme>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <>
                <NavBar />
                <Profile />
              </>
            }
          />
          <Route
            path="/sell"
            element={
              <>
                <NavBar />
                <Sell />
              </>
            }
          />
          <Route
            path="/my-listings"
            element={
              <>
                <NavBar />
                <MyListings />
              </>
            }
          />
          <Route
            path="/browse"
            element={
              <>
                <NavBar searchBar />
                <Browse />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <NavBar />
                <ProductPage />
              </>
            }
          />
        </Routes>
      </Router>
    </DarkTheme>
  );
};

export default App;

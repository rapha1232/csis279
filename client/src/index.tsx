import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Profile from "./pages/Profile";
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Browse from "./pages/Browse";
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar/NavBar";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="react-ui-theme">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <App />
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
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();

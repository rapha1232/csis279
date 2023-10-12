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

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="react-ui-theme">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();

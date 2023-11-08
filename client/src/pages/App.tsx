import React, { useEffect, useState } from "react";
import DarkTheme from "../components/DarkTheme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { RootState, setUser } from "../app/store";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import { useDispatch } from "react-redux";
import Layout from "../Layout";
import PrivateRoute from "../PrivateRoute";
import {
  Article,
  Ask,
  Discussions,
  Events,
  Home,
  Profile,
  Questions,
  SignIn,
  SignUp,
  SingleEvent,
  Members,
  UserPage,
  APOD,
} from "./index";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "../components/ui/toaster";
const App = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      const savedUser = getLocalStorageUser();
      if (savedUser !== null) {
        // Check if savedUser is not null and not the string "null"
        setIsLoading(false);
        dispatch(setUser(savedUser));
      }
    }
  }, [user]);
  return (
    <DarkTheme>
      <CssBaseline />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              index
              element={
                <>
                  <Layout>
                    <Home />
                  </Layout>
                </>
              }
            />
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
            </Route>
            <Route
              element={<PrivateRoute user={user!} isLoading={isLoading} />}
            >
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/events"
                element={
                  <Layout>
                    <Events />
                  </Layout>
                }
              />
              <Route
                path="/discussions"
                element={
                  <Layout>
                    <Discussions />
                  </Layout>
                }
              />
              <Route
                path="/questions"
                element={
                  <Layout>
                    <Questions />
                  </Layout>
                }
              />
              <Route
                path="/members"
                element={
                  <Layout>
                    <Members />
                  </Layout>
                }
              />
              <Route
                path="/ask-question"
                element={
                  <Layout>
                    <Ask />
                  </Layout>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <Layout>
                    <SingleEvent />
                  </Layout>
                }
              />
              <Route
                path="/article/:id"
                element={
                  <Layout>
                    <Article />
                  </Layout>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <Layout>
                    <UserPage />
                  </Layout>
                }
              />
              <Route
                path="/apod"
                element={
                  <Layout>
                    <APOD />
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </main>
    </DarkTheme>
  );
};

export default App;

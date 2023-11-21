import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import {
  APOD,
  Discussions,
  Events,
  Home,
  Members,
  Profile,
  Questions,
  SignIn,
  SignUp,
  SingleDiscussion,
  SingleQuestion,
  UserPage,
} from "../pages";
import AuthLayout from "../pages/_auth/AuthLayout";

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    layout: <AuthLayout />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    layout: <AuthLayout />,
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/events",
    element: (
      <Layout>
        <Events />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/discussions",
    element: (
      <Layout>
        <Discussions />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/questions",
    element: (
      <Layout>
        <Questions />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/members",
    element: (
      <Layout>
        <Members />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/user/:id",
    element: (
      <Layout>
        <UserPage />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/apod",
    element: (
      <Layout>
        <APOD />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/question/:id",
    element: (
      <Layout>
        <SingleQuestion />
      </Layout>
    ),
    private: true,
  },
  {
    path: "/topic/:id",
    element: (
      <Layout>
        <SingleDiscussion />
      </Layout>
    ),
    private: true,
  },
];

export default routes;

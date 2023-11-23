import React from "react";
import Layout from "../Layout";
import {
  APOD,
  Discussions,
  Events,
  Home,
  Members,
  Profile,
  Questions,
  SingleDiscussion,
  SingleQuestion,
  UserPage,
} from "../pages";

const routes = [
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/events",
    element: (
      <Layout>
        <Events />
      </Layout>
    ),
  },
  {
    path: "/discussions",
    element: (
      <Layout>
        <Discussions />
      </Layout>
    ),
  },
  {
    path: "/questions",
    element: (
      <Layout>
        <Questions />
      </Layout>
    ),
  },
  {
    path: "/members",
    element: (
      <Layout>
        <Members />
      </Layout>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <Layout>
        <UserPage />
      </Layout>
    ),
  },
  {
    path: "/apod",
    element: (
      <Layout>
        <APOD />
      </Layout>
    ),
  },
  {
    path: "/question/:id",
    element: (
      <Layout>
        <SingleQuestion />
      </Layout>
    ),
  },
  {
    path: "/topic/:id",
    element: (
      <Layout>
        <SingleDiscussion />
      </Layout>
    ),
  },
];

export default routes;

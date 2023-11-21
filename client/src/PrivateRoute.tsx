import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "./types";

const PrivateRoute = ({ user }: { user: User }) => {
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;

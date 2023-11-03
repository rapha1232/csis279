import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "./types";
import Loader from "./components/shared/Loader";

const PrivateRoute = ({
  user,
  isLoading,
}: {
  user: User;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;

import React from "react";
import { useAppSelector } from "../app/hooks";
import { Container } from "@mui/material";

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  return <Container sx={{ pt: "100px" }}>{user?.user_firstName}</Container>;
};

export default Profile;

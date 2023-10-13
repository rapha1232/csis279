import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import NavBar from "../components/NavBar";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<AlertColor>("success");
  const location = useLocation();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (location.state && location.state.open) {
      setOpen(true);
      setToastMessage(location.state.message);
      setToastType(location.state.type);
    }
  }, [location]);

  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <NavBar />
      {user.user?.user_lastName}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;

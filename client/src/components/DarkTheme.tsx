import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DarkTheme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkTheme;

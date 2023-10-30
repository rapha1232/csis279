import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DarkTheme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkTheme;

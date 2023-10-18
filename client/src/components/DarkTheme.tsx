import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: purple[200],
    // },
    // background: {
    //   default: "#333333",
    // },
  },
});

const DarkTheme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default DarkTheme;

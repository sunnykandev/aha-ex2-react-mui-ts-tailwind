import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF9B33",
    },
    secondary: {
      main: "#FFD25F",
    },
    info: {
      main: "#00D1FF",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#181818",
      paper: "#181818",
    },
  },
  typography: {
    fontFamily: ["Ubuntu"].join(","),
    allVariants: {
      color: "#FFFFFF",
    },
  },
});

export const GRADIENT_START = "#FFD25F";
export const GRADIENT_END = "#FF5C01";

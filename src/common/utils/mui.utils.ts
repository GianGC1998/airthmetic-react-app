import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Open Sans"',
      '"Segoe UI"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

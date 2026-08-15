import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B5E20",
    },
    secondary: {
      main: "#66BB6A",
    },
    background: {
      default: "#F5F8F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "Poppins, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;

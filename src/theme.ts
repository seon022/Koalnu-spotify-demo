import { createTheme } from "@mui/material";
import { brown, pink } from "@mui/material/colors";

const PINK = "#D9B4B7";
const PINK_LIGHT = "#D9B4B7";
const BROWN = "#7C5A43";
const BROWN_LIGHT = "#735E53";
const ROSE_BROWN = "#aa7f7d";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: BROWN,
      light: BROWN_LIGHT,
    },
    secondary: {
      main: PINK,
      light: PINK_LIGHT,
    },
    background: {
      default: PINK,
      paper: BROWN_LIGHT,
    },
    text: {
      primary: PINK,
      secondary: BROWN_LIGHT,
    },
    action: {
      hover: ROSE_BROWN,
      active: BROWN,
    },
  },
  typography: {
    fontFamily: '"Pretendard", san-serif',
    h1: {
      fontWeight: 700,
      fontSize: "20px",
    },
    h2: {
      fontSize: "0.9rem",
    },
    body1: {
      fontSize: "12px",
    },
    subtitle1: {
      fontSize: "0.6rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          borderRadius: "16px",
          textTransform: "none",
        },
        containedSecondary: {
          backgroundColor: ROSE_BROWN,
          color: "#ddd",
          "&:hover": {
            backgroundColor: ROSE_BROWN,
            color: PINK,
          },
        },
        textPrimary: {
          backgroundColor: "transparent",
          padding: "0",
          borderRadius: "50px",
          color: BROWN,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;

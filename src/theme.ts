import { createTheme } from "@mui/material";

const PINK = "#D9B4B7";
const PINK_LIGHT = "#D9B4B7";
const BROWN = "#4B2E1D";
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
      active: PINK,
    },
  },
  typography: {
    fontFamily: '"Pretendard", san-serif',
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: BROWN,
          fontSize: "13px",
          "&.Mui-selected": {
            color: PINK_LIGHT,
          },
        },
        label: {
          "&.Mui-selected": { fontWeight: 600 },
        },
      },
    },
  },
});

export default theme;

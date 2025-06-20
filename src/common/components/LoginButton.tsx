import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import { getSpotifyAuthUrl } from "../../utils/auth";

const LoginButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const login = () => {
    getSpotifyAuthUrl();
  };
  return (
    <Button
      variant="contained"
      color="secondary"
      size={isMobile ? "medium" : "large"}
      onClick={login}
    >
      Login
    </Button>
  );
};

export default LoginButton;

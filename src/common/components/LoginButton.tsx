import { Button } from "@mui/material";
import React from "react";

import { getSpotifyAuthUrl } from "../../utils/auth";

const LoginButton = () => {
  const login = () => {
    getSpotifyAuthUrl();
  };
  return (
    <Button variant="contained" color="secondary" size="medium" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;

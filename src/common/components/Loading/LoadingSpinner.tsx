import { Box, useTheme } from "@mui/material";
import React from "react";
import { DotLoader } from "react-spinners";

const LoadingSpinner = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60px"
    >
      <Box
        sx={{
          color: "secondary.main",
        }}
      >
        <DotLoader color="currentColor" size={35} speedMultiplier={0.8} />
      </Box>
    </Box>
  );
};

export default LoadingSpinner;

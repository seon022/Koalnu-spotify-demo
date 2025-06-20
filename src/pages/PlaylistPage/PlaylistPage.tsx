import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

import useIsMobile from "../../hooks/useIsMobile";
import Library from "../../layout/components/Library";
import LibraryHead from "../../layout/components/LibraryHead";

const PlaylistPage = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box>
      <LibraryHead />
      <Library />
    </Box>
  );
};

export default PlaylistPage;

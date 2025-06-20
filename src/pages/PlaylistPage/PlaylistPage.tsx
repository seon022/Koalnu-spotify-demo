import { Box } from "@mui/material";
import React from "react";

import Library from "../../layout/components/Library";
import LibraryHead from "../../layout/components/LibraryHead";

const PlaylistPage = () => {
  return (
    <Box>
      <LibraryHead />
      <Library />
    </Box>
  );
};

export default PlaylistPage;

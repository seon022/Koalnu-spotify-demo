import { styled } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

import NewReleases from "./components/NewReleases";
import SeveralAlbums from "./components/SeveralAlbums";
import SeveralArtists from "./components/SeveralArtists";

const HomeContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 50px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 120px)",
  },
}));
const HomePage = () => {
  return (
    <HomeContainer>
      <Box mb={4}>
        <NewReleases />
      </Box>
      <Box mb={4}>
        <SeveralArtists />
      </Box>
      <Box mb={4}>
        <SeveralAlbums />
      </Box>
    </HomeContainer>
  );
};

export default HomePage;

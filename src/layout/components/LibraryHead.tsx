import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
  marginBottom: "10px",
});

const LibraryHead = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  const { mutate: createPlaylist } = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "나의 플레이 리스트" });
    } else {
      getSpotifyAuthUrl();
    }
  };
  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreatePlaylist}
      >
        <AddIcon />
      </Button>
    </Head>
  );
};

export default LibraryHead;

import { Button, Card, styled, Typography } from "@mui/material";
import React from "react";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const AddPlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body1">It's easy, we'll help you</Typography>
      <AddPlaylistButton variant="contained" color="secondary">
        Create playlist
      </AddPlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;

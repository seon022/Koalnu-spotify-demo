import { Button, Card, styled, Typography } from "@mui/material";
import React from "react";

import { useSnackbarStore } from "../../store/snackbarStore";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "20px",
  borderRadius: "8px",
  color: theme.palette.text.secondary,
}));

const AddPlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  const { show } = useSnackbarStore();

  const handleClick = () => {
    return show("로그인이 필요합니다.", "warning");
  };
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body1">It's easy, we'll help you</Typography>
      <AddPlaylistButton
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Create playlist
      </AddPlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;

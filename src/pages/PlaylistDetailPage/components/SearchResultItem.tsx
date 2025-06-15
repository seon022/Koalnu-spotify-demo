import { Box, Typography, Button, Avatar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import { Track } from "../../../models/track";

interface SearchResultItemProps {
  item: Track;
}

const SearchResultItem = ({ item }: SearchResultItemProps) => {
  const { id: playlistId } = useParams<{ id: string }>();
  const { mutate: addItem } = useAddItemToPlaylist();
  const trackImage = item.album?.images?.[0]?.url || "";
  const artistName = item.artists?.[0].name;
  const albumName = item.album?.name;

  const handleAddItem = () => {
    if (item.uri && playlistId) addItem({ uris: [item.uri], position: 0 });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={2}
      px={2}
      borderRadius={2}
      borderBottom="1px solid rgba(224, 224, 224, 0.2)"
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#353b35",
        },
      }}
    >
      <Box display="flex" alignItems="center" flex="1" sx={{ borderRadius: 1 }}>
        <Avatar
          src={trackImage}
          alt={item.name}
          variant="square"
          sx={{ width: 56, height: 56, marginRight: 2, borderRadius: 1 }}
        />

        <Box>
          <Typography
            variant="body2"
            fontWeight="bold"
            noWrap
            sx={(theme) => ({
              maxWidth: "200px",
              [theme.breakpoints.down("sm")]: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                maxWidth: "180px",
              },
            })}
          >
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {artistName}
          </Typography>
        </Box>
      </Box>

      <Box
        flex="1.5"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography variant="body2">{albumName}</Typography>
      </Box>

      <Box>
        <Button variant="outlined" size="small" onClick={handleAddItem}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default SearchResultItem;

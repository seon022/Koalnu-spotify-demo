import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Box, Typography } from "@mui/material";
import React from "react";

interface PlaylistItemProps {
  type: string;
  imageUrl?: string;
  name: string;
  ownerName: string;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlaylistItem = ({
  type,
  imageUrl,
  name,
  ownerName,
  id,
  handleClick,
  selected = false,
}: PlaylistItemProps) => {
  return (
    <Box
      onClick={() => handleClick(id)}
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        cursor: "pointer",
        borderRadius: 1,
        transition: "background-color 0.2s",
        backgroundColor: selected
          ? "rgba(148, 49, 115,0.16)"
          : "rgba(255, 255, 255, 0.06)",
        "&:hover": {
          backgroundColor: selected
            ? "rgba(148, 49, 115, 0.16)"
            : "rgba(148, 49, 115, 0.12)",
        },
        pl: 1,
        py: 1,
        mb: 1,
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          sx={{
            width: 50,
            height: 50,
            borderRadius: 1,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 50,
            height: 50,
            borderRadius: 1,
            backgroundColor: "primary.main",
            flexShrink: 0,
          }}
        >
          <LibraryMusicIcon sx={{ fontSize: 32 }} />
        </Box>
      )}
      <Box overflow="hidden">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {type} - {ownerName}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaylistItem;

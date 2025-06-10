import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Box, styled, Typography } from "@mui/material";
import React from "react";

export interface PlaylistHeaderProps {
  name: string;
  imageUrl: string;
  ownerName: string;
  tracksNumber: number;
}

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(4),
  background: "rgba(255, 255, 255, 0.03)",
  borderRadius: theme.spacing(2),
  color: "#fff",
}));

const PlaylistImage = styled(Box)(({ theme }) => ({
  width: 160,
  height: 160,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[4],
  flexShrink: 0,
  backgroundColor: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const PlaylistHeader = ({
  name,
  imageUrl,
  ownerName,
  tracksNumber,
}: PlaylistHeaderProps) => {
  const hasImage = !!imageUrl;

  return (
    <Wrapper>
      <PlaylistImage>
        {hasImage ? (
          <img
            src={imageUrl}
            alt="playlist"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <LibraryMusicIcon sx={{ fontSize: 64, color: "#888" }} />
        )}
      </PlaylistImage>
      <Box>
        <Typography variant="overline" sx={{ opacity: 0.8 }}>
          playlist
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {ownerName} : {tracksNumber} songs
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default PlaylistHeader;

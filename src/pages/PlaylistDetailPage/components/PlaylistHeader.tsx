import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Box, styled, Typography } from "@mui/material";
import React from "react";

import useIsMobile from "../../../hooks/useIsMobile";

export interface PlaylistHeaderProps {
  name: string;
  imageUrl: string;
  ownerName: string;
  tracksNumber: number;
  type: string;
}

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: "24px 20px",
  background: "rgba(255, 255, 255, 0.04)",
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: "12px 16px",
  },
}));

const PlaylistImage = styled(Box)(({ theme }) => ({
  width: 120,
  height: 100,
  borderRadius: 4,
  marginRight: 12,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: 80,
    height: 80,
  },
}));

const PlaylistHeader = ({
  name,
  imageUrl,
  ownerName,
  tracksNumber,
  type,
}: PlaylistHeaderProps) => {
  const hasImage = !!imageUrl;
  const isMobile = useIsMobile();
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
        {isMobile ? (
          ""
        ) : (
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            {type}
          </Typography>
        )}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          😎 {ownerName} - 🎵 {tracksNumber} songs
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default PlaylistHeader;

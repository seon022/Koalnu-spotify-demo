import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Typography, IconButton, styled, Button } from "@mui/material";
import React from "react";
import { transform } from "typescript";

import { Track } from "../../../../models/track";

interface SongCardProps {
  list: Track[];
}

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  backgroundColor: "#181818",
  position: "relative",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#282828",
  },
  "&:hover .add-button": {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
  },
  "&:hover .play-overlay": {
    opacity: 1,
    visibility: "visible",
  },
}));

const AlbumImageBox = styled(Box)({
  position: "relative",
  width: 50,
  height: 50,
  marginRight: 16,
  flexShrink: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AlbumImage = styled("img")({
  width: "100%",
  height: "100%",
  borderRadius: "4px",
  objectFit: "cover",
  display: "block",
});

const PlayOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s, visibility 0.3s",
  zIndex: 2,
}));

const SongInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
  overflow: "hidden",
}));

const DurationText = styled(Typography)({
  color: "#b3b3b3",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
});

const AddButton = styled(IconButton)(({ theme }) => ({
  marginRight: 16,
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  color: "#b3b3b3",
  backgroundColor: "#2a2a2a",
  width: 32,
  height: 32,
  transition: "opacity 0.3s, visibility 0.3s",
  "&:hover": {
    transform: "scale(1.08)",
  },
}));
const MoreButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 8,
  color: theme.palette.text.primary,
  backgroundColor: "transparent",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SongCard = ({ list }: SongCardProps) => {
  const tracksToShow = list.slice(0, 4);

  const handlePlay = (track: Track) => {
    console.log("Play track:", track);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {tracksToShow.map((track) => (
        <CardWrapper key={track.id}>
          <AlbumImageBox
            onClick={() => handlePlay(track)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <AlbumImage
              src={track.album?.images?.[0]?.url || ""}
              alt={track.name}
            />
            <PlayOverlay className="play-overlay">
              <PlayArrowIcon
                sx={{
                  color: "#fff",
                  fontSize: 30,
                  opacity: 0.8,
                  filter: "drop-shadow(0 0 4px #000)",
                }}
              />
            </PlayOverlay>
          </AlbumImageBox>
          <SongInfo>
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                color: "#fff",
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
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
              {track.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#b3b3b3",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {track.artists?.[0]?.name}
            </Typography>
          </SongInfo>
          <AddButton className="add-button">
            <AddCircleOutlineRoundedIcon />
          </AddButton>

          <DurationText>
            {track.duration_ms ? formatDuration(track.duration_ms) : "Unknown"}
          </DurationText>
          <MoreButton>
            <MoreHorizRoundedIcon />
          </MoreButton>
        </CardWrapper>
      ))}
    </Box>
  );
};

export default SongCard;

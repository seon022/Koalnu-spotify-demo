import { Box, styled, TableCell, TableRow } from "@mui/material";
import React from "react";

import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import { formatDuration } from "../../../utils/formatters";

interface MobilePlaylistItemProps {
  item: PlaylistTrack;
}

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  transition: "background 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.background.default,
    boxShadow:
      "0 4px 24px 0 rgba(104, 86, 64, 0.45), 0 1.5px 3px 0 rgba(152, 88, 129, 0.08)",
    color: theme.palette.primary.main,
  },
}));
const LeftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontWeight: 500,
  fontSize: "0.95rem",
}));
const TextContainer = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontWeight: 500,
  fontSize: "0.95rem",
  maxWidth: 160,
}));
const ImageContainer = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 8,
  overflow: "hidden",
  flexShrink: 0,
  marginRight: "16px",
  backgroundColor: theme.palette.grey[300],
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}));
const RightContainer = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
}));

const MobilePlaylistItem = ({ item }: MobilePlaylistItemProps) => {
  const isTrack = (item: Track | Episode): item is Track => {
    return "album" in item;
  };
  const imageUrl = isTrack(item.track) ? item.track.album?.images?.[0].url : "";
  return (
    <ItemContainer>
      <LeftContainer>
        <ImageContainer>
          {imageUrl && <img src={imageUrl} alt={item.track.name} />}
        </ImageContainer>
        <TextContainer>
          <div>{item.track.name || "No Title"}</div>
          <div>{isTrack(item.track) && item.track.artists?.[0]?.name}</div>
        </TextContainer>
      </LeftContainer>

      <RightContainer>
        {item.track.duration_ms
          ? formatDuration(item.track.duration_ms)
          : "Unknown"}
      </RightContainer>
    </ItemContainer>
  );
};

export default MobilePlaylistItem;

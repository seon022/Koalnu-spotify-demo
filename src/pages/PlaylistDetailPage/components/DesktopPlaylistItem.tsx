import { styled, TableCell, TableRow } from "@mui/material";
import React from "react";

import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import { formatDate, formatDuration } from "../../../utils/formatters";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const CustomBodyCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
}));
const TitleCell = styled(TableCell)(() => ({
  borderBottom: "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 140,
}));
const AlbumCell = styled(TableCell)(() => ({
  borderBottom: "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 200,
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.06)",
    boxShadow:
      "0 4px 24px 0 rgba(14, 38, 22, 0.45), 0 1.5px 3px 0 rgba(46, 119, 64, 0.08)",
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  return (
    <CustomTableRow>
      <CustomBodyCell>{index}</CustomBodyCell>
      <TitleCell>{item.track.name || "no name"}</TitleCell>
      <AlbumCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </AlbumCell>
      <CustomBodyCell>
        {item.added_at ? formatDate(item.added_at) : "Unknown"}
      </CustomBodyCell>
      <CustomBodyCell>
        {item.track.duration_ms
          ? formatDuration(item.track.duration_ms)
          : "Unknown"}
      </CustomBodyCell>
    </CustomTableRow>
  );
};

export default DesktopPlaylistItem;

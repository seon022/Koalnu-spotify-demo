import { Box, Typography, Avatar, styled } from "@mui/material";

import PlayButton from "../../../common/components/PlayButton";
import { SimplifiedAlbum } from "../../../models/albums";
import { Artist } from "../../../models/artist";
import { Track } from "../../../models/track";

interface TopResultProps {
  data: Track | Artist | SimplifiedAlbum;
}

const TopResultContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  borderRadius: "16px",
  backgroundColor: "#121212",
  transition: "transform 0.3s",
  cursor: "pointer",
  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
  "&:hover": {
    transform: "scale(1.02)",
    backgroundColor: "#1a1a1a",
  },
  "&:hover .hover-button": {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  },
}));

const TopResultImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(24),
  height: theme.spacing(24),
  marginBottom: theme.spacing(2.5),
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.25)",
  fontSize: theme.spacing(12),
}));

const getType = (data: Track | Artist | SimplifiedAlbum) => {
  if ("artists" in data && "album" in data) return "track";
  if ("type" in data && data.type === "album") return "album";
  return "artist";
};

const TopResult = ({ data }: TopResultProps) => {
  const type = getType(data);

  let imageUrl = "";
  let title = "";
  let subtitle = "";
  if (type === "artist") {
    const artist = data as Artist;
    imageUrl = artist.images?.[0]?.url || "";
    title = artist.name || "";
    subtitle = "아티스트";
  } else if (type === "track") {
    const track = data as Track;
    imageUrl = track.album?.images?.[0]?.url || "";
    title = track.name || "";
    subtitle = track.artists?.[0].name || "";
  } else if (type === "album") {
    const album = data as SimplifiedAlbum;
    imageUrl = album.images?.[0]?.url || "";
    title = album.name;
    subtitle = album.artists?.map((a) => a.name).join(", ");
  }

  return (
    <TopResultContainer>
      <TopResultImage
        alt={title}
        src={imageUrl}
        variant={type === "artist" ? "circular" : "rounded"}
      >
        {!imageUrl && title[0]}
      </TopResultImage>
      <Typography
        variant="h6"
        sx={{ color: "#fff", fontWeight: 700, textAlign: "center", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: "#b3b3b3", textAlign: "center", mb: 2 }}
      >
        {subtitle}
      </Typography>
      <Box
        className="hover-button"
        sx={{
          position: "absolute",
          right: 36,
          bottom: 48,
          transform: "translateY(10%)",
          opacity: 0,
          visibility: "hidden",
          transition:
            "transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease",
        }}
      >
        <PlayButton />
      </Box>
    </TopResultContainer>
  );
};

export default TopResult;

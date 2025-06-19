import { Box, Typography, Avatar, styled } from "@mui/material";
import React from "react";

import PlayButton from "../../../common/components/PlayButton";
import { useResponsiveCount } from "../../../hooks/useResponsiveCount";
import { Artist } from "../../../models/artist";

interface ArtistCardProps {
  list: Artist[];
}
const ArtistContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: "10px",
  backgroundColor: theme.palette.background.default,
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.12)",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
    transform: "scale(1.01)",
  },
  "&:hover .hover-button": {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  },
}));

const ArtistImage = styled(Avatar)(({ theme }) => ({
  width: "10vw",
  height: "10vw",
  minWidth: 120,
  minHeight: 120,
  maxWidth: 160,
  maxHeight: 160,
  marginBottom: theme.spacing(2),
}));

const ArtistCard = ({ list }: ArtistCardProps) => {
  const count = useResponsiveCount({ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 });
  const artistsToShow = list.slice(0, count);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${artistsToShow.length}, 1fr)`,
        gap: 3,
        width: "100%",
        alignItems: "stretch",
      }}
    >
      {artistsToShow.map((item) => (
        <ArtistContainer key={item.id}>
          <ArtistImage alt={item.name} src={item.images?.[0]?.url || ""} />
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main", textAlign: "center" }}
          >
            {item.name}
          </Typography>
          <Box
            className="hover-button"
            sx={{
              position: "absolute",
              right: 20,
              bottom: 30,
              transform: "translateY(10%)",
              opacity: 0,
              visibility: "hidden",
              transition:
                "transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease",
            }}
          >
            <PlayButton />
          </Box>
        </ArtistContainer>
      ))}
    </Box>
  );
};

export default ArtistCard;

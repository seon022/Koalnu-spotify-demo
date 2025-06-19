import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

import PlayButton from "./PlayButton";

interface CardProps {
  name: string;
  image: string;
  artistName?: string;
}

const Card = ({ image, name, artistName }: CardProps) => {
  const theme = useTheme();

  return (
    <MuiCard
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        padding: 1,
        height: "100%",

        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          transform: "scale(1.01)",
          "& .hover-button": {
            transform: "translateY(0%)",
            opacity: 1,
            visibility: "visible",
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box
          className="hover-button"
          sx={{
            position: "absolute",
            right: { xs: 8, sm: 10 },
            bottom: { xs: 8, sm: 12 },
            transform: "translateY(10%)",
            opacity: 0,
            visibility: "hidden",
            transition:
              "transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease",
          }}
        >
          <PlayButton />
        </Box>
      </Box>
      <CardContent
        sx={{
          p: { xs: 1, sm: 1.5 },
          pt: 2,
          minHeight: { xs: 50, sm: 60 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          noWrap
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            mb: 0.5,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            opacity: 0.8,
          }}
        >
          {artistName ?? "Unknown Artist"}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

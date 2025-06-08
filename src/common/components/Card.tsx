import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import PlayButton from "./PlayButton";

interface CardProps {
  name: string;
  image: string;
  artistName?: string;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <MuiCard
      sx={{
        position: "relative",
        maxWidth: 280,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.default",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "background.paper",
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
          sx={{ objectFit: "cover", maxHeight: 160 }}
        />

        <Box
          className="hover-button"
          sx={{
            position: "absolute",
            right: 10,
            bottom: 12,
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
      <CardContent sx={{ p: 1, pt: 2, minHeight: 30, maxHeight: 70 }}>
        <Typography variant="subtitle2" fontWeight="bold" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {artistName ?? "Unknown Artist"}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;

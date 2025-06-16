import { Card as MuiCard, Typography, Box } from "@mui/material";
import React, { useMemo } from "react";

import { getRandomColor } from "../../../utils/getRandomColors";

interface CategoryCardProps {
  name: string;
  iconUrl: string;
}

function CategoryCard({ name, iconUrl }: CategoryCardProps) {
  const color = useMemo(() => getRandomColor(), []);
  return (
    <MuiCard
      sx={{
        width: "100%",
        position: "relative",
        minHeight: 180,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        backgroundColor: color,
        p: 0,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -30,
          bottom: -20,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `url(${iconUrl}) center/cover no-repeat`,
          opacity: 0.22,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          px: 2,
          py: 1,
          maxWidth: "90%",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="#dfdfdf"
          noWrap
          sx={{
            textShadow: "0 2px 8px rgba(0,0,0,0.18)",
            fontSize: "1.15rem",
          }}
        >
          {name}
        </Typography>
      </Box>
    </MuiCard>
  );
}

export default CategoryCard;

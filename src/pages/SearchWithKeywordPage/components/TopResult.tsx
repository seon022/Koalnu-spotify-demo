import { Box, Typography, Avatar, styled } from "@mui/material";

import PlayButton from "../../../common/components/PlayButton";
import { Artist } from "../../../models/artist";

interface TopResultProps {
  data: Artist;
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
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  transition: "transform 0.3s",
  cursor: "pointer",
  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
  "&:hover": {
    transform: "scale(1.02)",
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.secondary.main,
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
  [theme.breakpoints.down("sm")]: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const TopResult = ({ data }: TopResultProps) => {
  const imageUrl = data.images?.[0]?.url || "";
  const title = data.name;
  const subtitle = data.name;

  return (
    <TopResultContainer>
      <TopResultImage alt={title} src={imageUrl} variant="circular">
        {!imageUrl && title}
      </TopResultImage>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle2" sx={{ textAlign: "center", mb: 2 }}>
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

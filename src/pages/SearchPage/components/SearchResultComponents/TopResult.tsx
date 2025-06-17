import { Box, Typography } from "@mui/material";

import { Artist } from "../../../../models/artist";
import { Track } from "../../../../models/track";

interface TopResultProps {
  item: Track | Artist;
}
const TopResult = ({ item }: TopResultProps) => (
  <Box sx={{ backgroundColor: "#282828", borderRadius: 2, padding: 2 }}>
    <Typography variant="subtitle1">Top Result</Typography>
    <Typography variant="h6" fontWeight="bold">
      {item.name}
    </Typography>
    <Typography variant="body2" color="gray">
      {item.name}
    </Typography>
  </Box>
);

export default TopResult;

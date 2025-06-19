import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Typography } from "@mui/material";

import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useGetSeveralArtists from "../../../hooks/useGetSeveralArtists";
import ArtistCard from "../../SearchWithKeywordPage/components/ArtistCard";

const SeveralArtists = () => {
  const { data, error, isLoading } = useGetSeveralArtists();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <Box>
      <Typography variant="h1" marginBottom="10px">
        Artists
      </Typography>
      {data?.artists.length ? (
        <ArtistCard list={data.artists} />
      ) : (
        <Typography>No Artists Found</Typography>
      )}
    </Box>
  );
};

export default SeveralArtists;

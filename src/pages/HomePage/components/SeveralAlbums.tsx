import { Box, Typography, Grid } from "@mui/material";

import Card from "../../../common/components/Card";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useGetSeveralAlbums from "../../../hooks/useGetSeveralAlbums";

const SeveralAlbums = () => {
  const { data, error, isLoading } = useGetSeveralAlbums();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <Box>
      <Typography variant="h1" marginBottom="10px">
        Albums
      </Typography>
      {data?.albums.length ? (
        <Grid container spacing={2}>
          {data.albums.map((item, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id || index}>
              <Card
                image={item.images?.[0]?.url}
                name={item.name}
                artistName={item.artists?.[0]?.name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No Albums Found</Typography>
      )}
    </Box>
  );
};

export default SeveralAlbums;

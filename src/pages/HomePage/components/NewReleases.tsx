import { Box, Grid, Typography } from "@mui/material";

import Card from "../../../common/components/Card";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useGetNewReleases from "../../../hooks/useGetNewReleases";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <Box pb={2}>
      <Typography variant="h1" marginBottom="10px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No Data</Typography>
      )}
    </Box>
  );
};

export default NewReleases;

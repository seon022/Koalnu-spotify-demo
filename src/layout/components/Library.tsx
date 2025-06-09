import { styled } from "@mui/material/styles";

import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserProfile();

  const { data, isLoading, error } = useGetCurrentUserPlaylists({
    limit: 20,
    offset: 0,
  });
  console.log(data);

  if (!isUserLoading && !user) return <EmptyPlaylist />;
  if (isLoading || isUserLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  if (!data || data.items.length === 0) return <EmptyPlaylist />;

  return (
    <PlaylistContainer>
      <Playlist playlists={data.items} />
    </PlaylistContainer>
  );
};

export default Library;

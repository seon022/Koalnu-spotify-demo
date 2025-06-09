import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import EmptyPlaylist from "./EmptyPlaylist";
import Playlist from "./Playlist";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 304px)",
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
  const { ref, inView } = useInView();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserProfile();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) return <EmptyPlaylist />;
  if (isLoading || isUserLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  if (!data || data?.pages[0].total === 0) return <EmptyPlaylist />;

  return (
    <PlaylistContainer>
      {data?.pages.map((page, index) => (
        <Playlist playlists={page.items} key={index} />
      ))}
      <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
    </PlaylistContainer>
  );
};

export default Library;

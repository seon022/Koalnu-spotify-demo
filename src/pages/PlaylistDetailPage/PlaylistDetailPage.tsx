import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Navigate, useParams } from "react-router-dom";

import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import PlaylistHeader from "./components/PlaylistHeader";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItem";

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

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });

  const {
    data: playlistItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id ?? "", limit: PAGE_LIMIT });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (id === undefined) return <Navigate to="/" />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const numberOfSongs = playlist?.tracks?.total ?? 0;

  return (
    <div>
      <PlaylistHeader
        type={playlist?.type ?? ""}
        tracksNumber={numberOfSongs}
        imageUrl={playlist?.images?.[0]?.url ?? ""}
        name={playlist?.name ?? ""}
        ownerName={playlist?.owner?.display_name ?? ""}
      />

      {numberOfSongs === 0 ? (
        <Typography>No tracks in this playlist.</Typography>
      ) : (
        <PlaylistContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                )),
              )}
            </TableBody>
          </Table>
          <div ref={ref} style={{ height: 1 }} />
          {isFetchingNextPage && <LoadingSpinner />}
        </PlaylistContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;

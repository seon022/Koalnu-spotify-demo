import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Navigate, useParams } from "react-router-dom";

import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import EmptyPlaylistItemWithSearch from "./components/EmptyPlaylistItemWithSearch";
import LoginRequiredNotice from "./components/LoginRequireNotice";
import PlaylistHeader from "./components/PlaylistHeader";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItem";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 300px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  marginTop: "10px",
  paddingBottom: "30px",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const CustomTableCell = styled(TableCell)(() => ({
  backgroundColor: "rgba(24, 24, 27, 0.9)",
  borderBottom: "none",
  fontWeight: 600,
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({
    playlist_id: id ?? "",
  });
  const { data: userProfile } = useGetCurrentUserProfile();

  const {
    data: playlistItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id ?? "", limit: PAGE_LIMIT });

  const { ref, inView } = useInView();

  const numberOfSongs = playlist?.tracks?.total ?? 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!userProfile) {
    return <LoginRequiredNotice />;
  }

  if (error) {
    return <ErrorMessage errorMessage="Failed to load" />;
  }
  if (id === undefined) return <Navigate to="/" />;
  if (isLoading) return <LoadingSpinner />;

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
        <EmptyPlaylistItemWithSearch />
      ) : (
        <PlaylistContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <CustomTableCell>#</CustomTableCell>
                <CustomTableCell>Title</CustomTableCell>
                <CustomTableCell>Album</CustomTableCell>
                <CustomTableCell>Date added</CustomTableCell>
                <CustomTableCell>Duration</CustomTableCell>
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
          <div ref={ref} style={{ height: 40 }}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;

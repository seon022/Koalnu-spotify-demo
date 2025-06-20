import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Navigate, useParams } from "react-router-dom";

import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import EmptyPlaylistItemWithSearch from "./components/EmptyPlaylistItemWithSearch";
import LoginRequiredNotice from "./components/LoginRequireNotice";
import MobilePlaylistItem from "./components/MobilePlaylistItem";
import PlaylistHeader from "./components/PlaylistHeader";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItem";
import useIsMobile from "../../hooks/useIsMobile";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 270px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  marginTop: "10px",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  borderRadius: "10px",
  backgroundColor: theme.palette.action.hover,
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  borderBottom: "none",
  fontWeight: 600,
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({
    playlist_id: id ?? "",
  });
  const { data: userProfile } = useGetCurrentUserProfile();
  const isMobile = useIsMobile();

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
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ color: "primary.main" }}
          >
            {isMobile ? (
              ""
            ) : (
              <TableHead>
                <TableRow>
                  <CustomTableCell>#</CustomTableCell>
                  <CustomTableCell>Title</CustomTableCell>
                  <CustomTableCell>Album</CustomTableCell>
                  <CustomTableCell>Date added</CustomTableCell>
                  <CustomTableCell>Duration</CustomTableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) =>
                  isMobile ? (
                    <MobilePlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  ) : (
                    <DesktopPlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  ),
                ),
              )}
            </TableBody>
          </Table>
          <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;

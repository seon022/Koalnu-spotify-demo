import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import { Track } from "../../../models/track";

interface PlaylistMenuProps {
  track: Track;
}

const AddButton = styled(IconButton)(({ theme }) => ({
  marginRight: 16,
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  color: "#b3b3b3",
  backgroundColor: "#2a2a2a",
  width: 32,
  height: 32,
  transition: "opacity 0.3s, visibility 0.3s",
  "&:hover": {
    transform: "scale(1.08)",
  },
}));

export default function PlaylistMenu({ track }: PlaylistMenuProps) {
  const { ref, inView } = useInView();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 20,
    offset: 0,
  });
  const { mutate: addItem } = useAddItemToPlaylist();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const open = Boolean(anchorEl);
  const playlistsData = data?.pages.flatMap((page) => page.items) || [];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (playlist_id: string) => {
    if (playlist_id && track.uri)
      addItem(
        { playlist_id, uris: [track.uri], position: 0 },
        {
          onSuccess: () => {
            setSnackbarOpen(true);
          },
        },
      );
    handleClose();
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <>
      <AddButton onClick={handleOpen} className="add-button">
        <AddCircleOutlineRoundedIcon />
      </AddButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: 300,
          width: "20vw",
        }}
      >
        {playlistsData.map(
          (playlist) =>
            playlist.id && (
              <MenuItem
                key={playlist.id}
                onClick={() => {
                  if (playlist.id) handleSelect(playlist.id);
                }}
              >
                <ListItemText primary={playlist.name} />
              </MenuItem>
            ),
        )}
        <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
      </Menu>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`Added "${track.name}" to your playlist.`}
        </Alert>
      </Snackbar>
    </>
  );
}

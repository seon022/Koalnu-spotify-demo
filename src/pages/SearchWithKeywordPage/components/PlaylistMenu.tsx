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

import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
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
  const { mutate: addItem } = useAddItemToPlaylist();
  const { data: user } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 20,
      offset: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, user]);

  const open = Boolean(anchorEl);
  const playlistsData = data?.pages.flatMap((page) => page.items) || [];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      return alert("로그인해주세요.");
    }
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

  return (
    <>
      <AddButton onClick={handleOpen} className="add-button">
        <AddCircleOutlineRoundedIcon />
      </AddButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          sx: {
            maxHeight: 300,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#555",
              borderRadius: "4px",
              border: "2px solid transparent",
              backgroundClip: "content-box",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#888",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#555 transparent",
          },
        }}
        sx={{ width: "24vw", minWidth: "240px", padding: 2 }}
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

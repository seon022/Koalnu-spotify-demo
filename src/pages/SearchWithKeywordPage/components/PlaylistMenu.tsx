import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import { Track } from "../../../models/track";
import { useSnackbarStore } from "../../../store/snackbarStore";

interface PlaylistMenuProps {
  track: Track;
}

const AddButton = styled(IconButton)(({ theme }) => ({
  marginRight: 16,
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  width: 32,
  height: 32,
  transition: "opacity 0.3s, visibility 0.3s",
  color: theme.palette.secondary.main,
  "&:hover": {
    transform: "scale(1.08)",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
  },
}));

export default function PlaylistMenu({ track }: PlaylistMenuProps) {
  const { ref, inView } = useInView();
  const { mutate: addItem } = useAddItemToPlaylist();
  const { data: user } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { show } = useSnackbarStore();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
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
      return show("로그인이 필요합니다.", "warning");
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
            show(`Added to playlist!`, "success");
          },
        },
      );
    handleClose();
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
    </>
  );
}

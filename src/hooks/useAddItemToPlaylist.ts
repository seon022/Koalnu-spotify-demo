import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { AddItemToPlaylist } from "../apis/playlistApi";
import { PAGE_LIMIT } from "../configs/commonConfig";
import { AddItemToPlaylistRequest } from "../models/playlist";

const useAddItemToPlaylist = () => {
  const queryClient = useQueryClient();
  const { id: playlist_id } = useParams<{ id: string }>();

  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => {
      return AddItemToPlaylist(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlist"] });
      queryClient.invalidateQueries({
        queryKey: [
          "playlist-items",
          { playlist_id: playlist_id, limit: PAGE_LIMIT },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
    },
  });
};

export default useAddItemToPlaylist;

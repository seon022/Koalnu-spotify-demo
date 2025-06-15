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
      if (playlist_id) return AddItemToPlaylist(playlist_id, params);

      return Promise.reject(new Error("playlist_id is undefined."));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlist"] });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items", { playlist_id, limit: PAGE_LIMIT }],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
    },
  });
};

export default useAddItemToPlaylist;

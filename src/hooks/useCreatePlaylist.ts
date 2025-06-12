import { useMutation, useQueryClient } from "@tanstack/react-query";

import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { createPlaylist } from "../apis/playlistApi";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (user && user.id) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("User is not defined."));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlist"] });
    },
  });
};

export default useCreatePlaylist;

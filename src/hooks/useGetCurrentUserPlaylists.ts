import { useQuery } from "@tanstack/react-query";

import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylsitRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylsitRequest) => {
  return useQuery({
    queryKey: ["current-user-playlist"],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset });
    },
  });
};

export default useGetCurrentUserPlaylists;

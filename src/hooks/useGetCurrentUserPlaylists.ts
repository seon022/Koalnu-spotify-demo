import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylsitRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylsitRequest) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlist"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
    },
  });
};

export default useGetCurrentUserPlaylists;

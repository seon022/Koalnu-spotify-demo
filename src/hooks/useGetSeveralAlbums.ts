import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralAlbums } from "../apis/albumApi";

const ALBUM_IDS = [
  "4N1fROq2oeyLGAlQ1C1j18",
  "6P0N7vLC7VYmt7ZzH6P8MD",
  "7kEtCtHsaRjz0fIXbmUFNt",
];

const useGetSeveralAlbums = (market?: string) => {
  const token = useClientCredentialToken();

  return useQuery({
    queryKey: ["several-albums", ALBUM_IDS, market],
    queryFn: () => {
      if (!token) throw new Error("No token available");
      return getSeveralAlbums(token, ALBUM_IDS, market);
    },
    enabled: !!token,
  });
};

export default useGetSeveralAlbums;

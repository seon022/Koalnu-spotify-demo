import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralAlbums } from "../apis/albumApi";

const ALBUM_IDS = [
  "382ObEPsp2rxGrnsizN5TX", // Example album ID
  "1A2GTWGtFfWp7KSQTwWOyo", // Example album ID
  "2noRn2Aes5aoNVsU6iWThc", // Example album ID
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

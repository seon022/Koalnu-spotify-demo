import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralArtists } from "../apis/artistsApi";

const ARTIST_IDS = [
  "250b0Wlc5Vk0CoUsaCY84M",
  "3DiDSECUqqY1AuBP8qtaIa",
  "7f4ignuCJhLXfZ9giKT7rH",
  "4FqmqIspLaUGtxAFFLsZxc",
  "1uNFoZAHBGtllmzznpCI3s",
];

const useGetSeveralArtists = () => {
  const token = useClientCredentialToken();

  return useQuery({
    queryKey: ["several-artists", ARTIST_IDS],
    queryFn: () => {
      if (!token) throw new Error("No token available");
      return getSeveralArtists(token, ARTIST_IDS);
    },
  });
};

export default useGetSeveralArtists;

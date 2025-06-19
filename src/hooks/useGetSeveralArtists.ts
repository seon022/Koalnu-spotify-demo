import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralArtists } from "../apis/artistsApi";

const ARTIST_IDS = [
  "2CIMQHirSU0MQqyYHq0eOx", // Deadmau5
  "57dN52uHvrHOxijzpIgu3E", // Daft Punk
  "1vCWHaC5f2uS3yhpwWbIA6", // Avicii
  "1vCWHaC5f2uS3yhpwWbIA6", // Avicii
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

import axios from "axios";

import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SeveralArtistsResponse } from "../models/artist";

export const getSeveralArtists = async (
  token: string,
  artistIds: string[],
): Promise<SeveralArtistsResponse> => {
  const ids = artistIds.join(",");
  const response = await axios.get(`${SPOTIFY_BASE_URL}/artists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids,
    },
  });
  return response.data;
};

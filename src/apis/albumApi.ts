import axios from "axios";

import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import {
  GetNewReleasesResponse,
  SeveralAlbumsResponse,
} from "../models/albums";

export const getNewReleases = async (
  ClientCredentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
      {
        headers: { Authorization: `Bearer ${ClientCredentialToken}` },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch new releases");
  }
};

export const getSeveralAlbums = async (
  token: string,
  albumIds: string[],
  market?: string,
): Promise<SeveralAlbumsResponse> => {
  const ids = albumIds.join(",");
  const response = await axios.get(`${SPOTIFY_BASE_URL}/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids,
      ...(market && { market }),
    },
  });
  return response.data;
};

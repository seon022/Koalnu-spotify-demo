import axios from "axios";

import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import {
  GetSeveralBrowseCategoriesRequest,
  GetSeveralBrowseCategoriesResponse,
} from "../models/category";

export const getBrowseCategories = async (
  clientCredentialToken: string,
  { locale, limit, offset }: GetSeveralBrowseCategoriesRequest,
): Promise<GetSeveralBrowseCategoriesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: { Authorization: `Bearer ${clientCredentialToken}` },
      params: { locale, limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

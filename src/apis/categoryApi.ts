import {
  GetSeveralBrowseCategoriesRequest,
  GetSeveralBrowseCategoriesResponse,
} from "../models/category";
import api from "../utils/api";

export const getBrowseCategories = async ({
  locale,
  limit,
  offset,
}: GetSeveralBrowseCategoriesRequest): Promise<GetSeveralBrowseCategoriesResponse> => {
  try {
    const response = await api.get(`/browse/categories`, {
      params: { locale, limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

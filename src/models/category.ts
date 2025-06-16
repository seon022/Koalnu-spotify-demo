import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface GetSeveralBrowseCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface GetSeveralBrowseCategoriesResponse {
  categories: ApiResponse<Category>;
}

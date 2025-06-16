import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getBrowseCategories } from "../apis/categoryApi";
import { GetSeveralBrowseCategoriesRequest } from "../models/category";

const useGetBrowseCategories = ({
  locale,
  limit,
}: GetSeveralBrowseCategoriesRequest) => {
  return useInfiniteQuery({
    queryKey: ["several-browse-categories"],
    queryFn: ({ pageParam = 0 }) => {
      return getBrowseCategories({ locale, limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.categories.next) {
        const url = new URL(lastPage.categories.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
    },
  });
};

export default useGetBrowseCategories;

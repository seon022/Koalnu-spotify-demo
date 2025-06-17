import { useInfiniteQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getBrowseCategories } from "../apis/categoryApi";
import { GetSeveralBrowseCategoriesRequest } from "../models/category";

const useGetBrowseCategories = ({
  locale,
  limit,
}: GetSeveralBrowseCategoriesRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["several-browse-categories", locale, limit],
    enabled: !!clientCredentialToken,
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getBrowseCategories(clientCredentialToken, {
        locale,
        limit,
        offset: pageParam,
      });
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

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, Typography, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";

const SearchWrapper = styled("div")(() => ({
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "10px",
}));

const SearchResultContainer = styled("div")(() => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 400px)",
  flex: 1,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  borderRadius: "10px",
}));

const SearchBox = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: "100%",
  maxWidth: 500,
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
}));

const EmptyPlaylistItemWithSearch = () => {
  const { ref, inView } = useInView();
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <SearchWrapper>
      <Typography variant="h1" my={4}>
        Let's find something for your playlist!
      </Typography>

      <SearchBox>
        <SearchIcon
          sx={{
            marginLeft: "12px",
          }}
        />
        <InputBase
          value={keyword}
          placeholder="Search for songs, artists"
          onChange={handleSearchKeyword}
          sx={{
            color: "white",
            width: "100%",
            padding: "10px 12px 10px 10px",
          }}
        />
      </SearchBox>

      <SearchResultContainer>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          keyword.trim() !== "" &&
          data?.pages.every((page) => page.tracks?.items?.length === 0) && (
            <Typography
              variant="h6"
              sx={{ mt: 4, textAlign: "center", color: "gray" }}
            >
              "{keyword}" 와 일치하는 검색 결과가 없습니다.🥲
            </Typography>
          )}
        {data?.pages.map((item) => {
          if (!item.tracks) return false;
          return <SearchResultList list={item.tracks?.items} />;
        })}
        <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
      </SearchResultContainer>
    </SearchWrapper>
  );
};

export default EmptyPlaylistItemWithSearch;

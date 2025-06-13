import { styled, TextField, Typography } from "@mui/material";
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

const SearchResultContainer = styled("div")(({ theme }) => ({
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
  console.log("ddd", data);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value);
  };
  return (
    <SearchWrapper>
      <Typography variant="h1" my={4}>
        Let's find something for your playlist!
      </Typography>
      <TextField
        value={keyword}
        placeholder="Search for songs, artists"
        onChange={handleSearchKeyword}
        sx={{
          mb: 2,
          width: "100%",
          maxWidth: 500,
          borderRadius: 1,
          boxShadow: 1,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <SearchResultContainer>
        {data?.pages.map((item) => {
          if (!item.tracks) return false;
          return (
            <SearchResultList list={item.tracks?.items}></SearchResultList>
          );
        })}
        <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
      </SearchResultContainer>
    </SearchWrapper>
  );
};

export default EmptyPlaylistItemWithSearch;

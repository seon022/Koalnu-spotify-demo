import { styled } from "@mui/material";
import { Box, Grid } from "@mui/system";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import BrowseCategories from "./components/BrowseCategories";
import SearchField from "./components/SearchResultComponents/SearchField";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "../PlaylistDetailPage/components/SearchResultList";
import ArtistCard from "./components/SearchResultComponents/ArtistCard";
import SongCard from "./components/SearchResultComponents/SongCard";
import TopResult from "./components/SearchResultComponents/TopResult";
import Card from "../../common/components/Card";

const SearchPage = () => {
  const { ref, inView } = useInView();
  const [keyword, setKeyword] = useState("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 10,
    offset: 0,
  });
  console.log("data", data);

  return (
    <div>
      <SearchField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword.trim() === "" ? (
        <BrowseCategories />
      ) : (
        <>
          {error && <ErrorMessage errorMessage={error.message} />}
          {isLoading && <LoadingSpinner />}
          <Box>
            <Box>TopResult 올자리 상위검색결과</Box>
            <Box sx={{ xs: 2, md: 6 }}>
              {data?.pages.map((page, index) => (
                <SongCard key={index} list={page.tracks?.items || []} />
              ))}
            </Box>
          </Box>
          <Box sx={{ xs: 2, md: 6 }}>
            {data?.pages.map((page, index) => (
              <ArtistCard key={index} list={page.artists?.items || []} />
            ))}
          </Box>
          <Box>albums올자리</Box>
        </>
      )}
      {/* <SearchResultList /> */}
    </div>
  );
};

export default SearchPage;

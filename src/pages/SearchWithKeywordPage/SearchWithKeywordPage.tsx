import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArtistCard from "./components/ArtistCard";
import SongCard from "./components/SongCard";
import TopResult from "./components/TopResult";
import Card from "../../common/components/Card";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/Loading/LoadingSpinner";
import SearchField from "../../common/components/SearchField";
import { useResponsiveCount } from "../../hooks/useResponsiveCount";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";

const SearchWithKeywordContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 104px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 140px)",
    paddingBottom: "20px",
  },
}));
const TopResultAndSongsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const TopResultBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const SongsBox = styled(Box)(({ theme }) => ({
  flex: 2,
  minWidth: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const AlbumBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingBottom: 6,
}));

const SearchWithKeywordPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const urlKeyword = params.keyword || "";
  const [inputValue, setInputValue] = useState(urlKeyword);

  const keyword = urlKeyword;

  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    limit: 10,
    offset: 0,
  });
  console.log(data);

  const handleSearch = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === "") return;
    navigate(`/search/${encodeURIComponent(inputValue.trim())}`);
  };

  let topResultData = null;
  if (data?.pages[0]) {
    topResultData = data?.pages[0]?.artists?.items?.[0] || null;
  }
  const count = useResponsiveCount({ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 });
  const albumToShow = data?.pages[0]?.albums?.items.slice(0, count);
  return (
    <SearchWithKeywordContainer>
      <form onSubmit={handleSearch}>
        <SearchField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={handleSearch}
        />
      </form>
      {error && <ErrorMessage errorMessage={error.message} />}
      {isLoading && <LoadingSpinner />}
      <TopResultAndSongsContainer>
        <TopResultBox>
          <Typography variant="h6" sx={{ mb: 2 }}>
            상위 검색 결과
          </Typography>
          {topResultData && <TopResult data={topResultData} />}
        </TopResultBox>
        <SongsBox>
          <Typography variant="h6" sx={{ mb: 2 }}>
            노래
          </Typography>
          {data?.pages.map((page, index) => (
            <SongCard key={index} list={page.tracks?.items || []} />
          ))}
        </SongsBox>
      </TopResultAndSongsContainer>
      <Box my={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          아티스트
        </Typography>
        {data?.pages.map((page, index) => (
          <ArtistCard key={index} list={page.artists?.items || []} />
        ))}
      </Box>
      <AlbumBox>
        <Typography variant="h6" sx={{ mb: 2 }}>
          앨범
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${albumToShow?.length}, 1fr)`,
            gap: 3,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {albumToShow?.map((item) => (
            <Card
              image={item.images?.[0].url || ""}
              name={item.name || ""}
              artistName={item.artists[0].name}
              key={item.id}
            />
          ))}
        </Box>
      </AlbumBox>
    </SearchWithKeywordContainer>
  );
};

export default SearchWithKeywordPage;

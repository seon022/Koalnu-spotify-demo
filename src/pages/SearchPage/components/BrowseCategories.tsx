import { Grid, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Card from "../../../common/components/Card";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useGetBrowseCategories from "../../../hooks/useGetBrowseCategories";

const CategoriesContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 120px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const BrowseCategories = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useGetBrowseCategories({ locale: "ko_KR", limit: 10 });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {(error as Error).message}</div>;

  const categories = data?.pages.flatMap((page) => page.categories.items) ?? [];
  console.log("cate", categories);
  return (
    <CategoriesContainer>
      <h2>Spotify 카테고리 목록</h2>
      <Grid container spacing={2}>
        {categories.map((item) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
            <Card
              image={item.icons[0].url}
              name={item.name}
              artistName={item.name}
            />
          </Grid>
        ))}
      </Grid>
      <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
    </CategoriesContainer>
  );
};

export default BrowseCategories;

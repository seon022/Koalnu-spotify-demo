import { Box, Grid, styled, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import CategoryCard from "./CategoryCard";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import useGetBrowseCategories from "../../../hooks/useGetBrowseCategories";
import LoginRequiredNotice from "../../PlaylistDetailPage/components/LoginRequireNotice";

const CategoriesContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  width: "100%",
  maxHeight: "calc(100vh - 180px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 200px)",
  },
  cursor: "pointer",
  paddingBottom: "20px",
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    if ((error as AxiosError).status === 401) {
      return <LoginRequiredNotice />;
    }
    return <ErrorMessage errorMessage={(error as Error).message} />;
  }

  const categories = data?.pages.flatMap((page) => page.categories.items) ?? [];

  return (
    <CategoriesContainer>
      <Typography variant="h1" sx={{ mb: 2 }}>
        둘러보기
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 6, md: 12, lg: 12, xl: 12 }}
      >
        {categories.map((item, idx) => (
          <Grid size={{ xs: 1, sm: 3, md: 4, lg: 4, xl: 3 }} key={item.id}>
            <CategoryCard iconUrl={item.icons[0].url} name={item.name} />
          </Grid>
        ))}
      </Grid>
      <div ref={ref}>{hasNextPage && <LoadingSpinner />}</div>
    </CategoriesContainer>
  );
};

export default BrowseCategories;

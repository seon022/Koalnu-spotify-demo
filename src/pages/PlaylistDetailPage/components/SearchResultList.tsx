import { Box } from "@mui/material";
import React from "react";

import SearchResultItem from "./SearchResultItem";
import { Track } from "../../../models/track";

interface SearchResultListProps {
  list: Track[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      ></Box>
      {list.map((track) => (
        <SearchResultItem key={track.id} item={track} />
      ))}
    </div>
  );
};

export default SearchResultList;

import React from "react";

import SearchResultItem from "./SearchResultItem";
import { Track } from "../../../models/track";

interface SearchResultListProps {
  list: Track[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <SearchResultItem item={track} />
      ))}
    </div>
  );
};

export default SearchResultList;

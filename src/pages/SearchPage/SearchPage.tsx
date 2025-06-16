import React from "react";

import BrowseCategories from "./components/BrowseCategories";
import SearchField from "./components/SearchField";
import SearchResultList from "../PlaylistDetailPage/components/SearchResultList";

const SearchPage = () => {
  return (
    <div>
      <SearchField />
      <BrowseCategories />
      {/* <SearchResultList /> */}
    </div>
  );
};

export default SearchPage;

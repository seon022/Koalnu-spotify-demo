import React, { useState } from "react";

import BrowseCategories from "./components/BrowseCategories";
import SearchField from "./components/SearchField";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div>
      <SearchField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <BrowseCategories />
      {/* <SearchResultList /> */}
    </div>
  );
};

export default SearchPage;

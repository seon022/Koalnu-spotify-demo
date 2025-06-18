import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BrowseCategories from "./components/BrowseCategories";
import SearchField from "../../common/components/SearchField";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === "") return;
    navigate(`/search/${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <SearchField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={handleSearch}
        />
      </form>
      <BrowseCategories />
    </div>
  );
};

export default SearchPage;

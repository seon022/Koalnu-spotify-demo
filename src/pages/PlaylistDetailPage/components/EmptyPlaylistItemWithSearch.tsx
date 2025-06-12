import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const EmptyPlaylistItemWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value);
  };
  return (
    <div>
      <Typography variant="h1" my={4}>
        Let's find something for your playlist!
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
    </div>
  );
};

export default EmptyPlaylistItemWithSearch;

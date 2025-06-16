import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, InputBase } from "@mui/material";
import React from "react";

const SearchBox = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: "100%",
  maxWidth: 500,
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
}));

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
}: SearchFieldProps) => (
  <SearchBox>
    <SearchIcon sx={{ marginLeft: "12px" }} />
    <InputBase
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      sx={{
        color: "white",
        width: "100%",
        padding: "10px 12px 10px 10px",
      }}
      inputProps={{
        "aria-label": "search",
      }}
    />
  </SearchBox>
);

export default SearchField;

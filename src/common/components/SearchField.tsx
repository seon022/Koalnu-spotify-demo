import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, InputBase } from "@mui/material";
import React from "react";

const SearchBox = styled("div")(({ theme }) => ({
  margin: "0 auto",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: "100%",
  maxWidth: 700,
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
}));
const SearchButton = styled("div")(({ theme }) => ({
  color: "#fff",
  marginTop: 3,
}));
interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClick: (e: React.SyntheticEvent) => void;
}

const SearchField = ({
  value,
  onChange,
  onClick,
  placeholder = "검색어를 입력하세요",
}: SearchFieldProps) => (
  <SearchBox>
    <SearchButton onClick={onClick}>
      <SearchIcon sx={{ marginLeft: "12px" }} />
    </SearchButton>

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

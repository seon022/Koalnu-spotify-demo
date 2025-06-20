import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = ["/", "/search", "/playlist"];

  const currentValue = React.useMemo(() => {
    if (location.pathname.startsWith("/search")) return 1;
    if (location.pathname.startsWith("/playlist")) return 2;
  }, [location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentValue}
        onChange={(event, newValue) => {
          navigate(path[newValue]);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Library" icon={<LibraryMusicIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

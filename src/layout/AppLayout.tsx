import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Library from "./components/Library";
import LibraryHead from "./components/LibraryHead";
import Navbar from "./components/Navbar/Navbar";

const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  padding: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "8px 0",
  },
}));

const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  padding: "0 16px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  marginLeft: "8px",
  [theme.breakpoints.down("sm")]: {
    margin: 0,
    padding: "16px",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "25%",
  minWidth: "240px",
  maxWidth: "340px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px 20px",
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "10px 0",
  padding: "10px 0",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox sx={{ flexGrow: 1, marginBottom: 0 }}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <MainContent>
        <Navbar />
        <Outlet />
      </MainContent>
    </Layout>
  );
};

export default AppLayout;

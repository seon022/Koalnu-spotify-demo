import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Library from "./components/Library";
import LibraryHead from "./components/LibraryHead";
import Navbar from "./components/Navbar/Navbar";

const Layout = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));
const ContentsLayout = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  height: "calc(100vh - 64px)",
  padding: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "8px 0",
  },
}));

const MainContent = styled("main")(({ theme }) => ({
  width: "75%",
  flexGrow: 1,
  height: "100%",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  marginLeft: "8px",
  [theme.breakpoints.down("sm")]: {
    margin: 0,
    padding: "16px",
    backgroundColor: theme.palette.background.paper,
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
  color: theme.palette.secondary.light,
  "&:hover": {
    color: theme.palette.action.hover,
  },
  "&.active": {
    color: theme.palette.action.active,

    "& .nav-text": {
      fontWeight: 900,
      textShadow: "2px 2px 4px rgba(201, 48, 140, 0.2)",
      transform: "scale(1.05)",
    },
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Navbar />
      <ContentsLayout>
        <Sidebar>
          <ContentBox>
            <NavList>
              <StyledNavLink to="/">
                <HomeIcon />
                <Typography variant="h2" className="nav-text" fontWeight={600}>
                  Home
                </Typography>
              </StyledNavLink>
              <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" className="nav-text" fontWeight={600}>
                  Search
                </Typography>
              </StyledNavLink>
            </NavList>
          </ContentBox>
          <ContentBox sx={{ marginBottom: 0, flex: 1 }}>
            <LibraryHead />
            <Library />
          </ContentBox>
        </Sidebar>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentsLayout>
    </Layout>
  );
};

export default AppLayout;

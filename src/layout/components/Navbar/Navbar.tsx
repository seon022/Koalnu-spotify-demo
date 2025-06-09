import { Box, Typography } from "@mui/material";
import React from "react";

import ProfileToggle from "./ProfileToggle";
import LoginButton from "../../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const logout = useLogout();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="64px"
      padding="10px"
      paddingLeft={"14px"}
    >
      <Typography variant="subtitle1" fontSize={20} fontWeight="bold">
        👩‍💻 Music
      </Typography>
      {!userProfile ? (
        <LoginButton />
      ) : (
        <ProfileToggle
          imageUrl={userProfile.images?.[0]?.url}
          displayName={userProfile.display_name}
          onLogout={logout}
        />
      )}
    </Box>
  );
};

export default Navbar;

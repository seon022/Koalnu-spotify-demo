import { Box, Typography } from "@mui/material";
import React from "react";

import ProfileToggle from "./ProfileToggle";
import LoginButton from "../../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="64px"
      padding="10px"
      paddingLeft={"14px"}
    >
      <Typography
        color="textSecondary"
        variant="subtitle1"
        fontSize={20}
        fontWeight="bold"
      >
        👩‍💻 Music
      </Typography>
      {!userProfile ? (
        <LoginButton />
      ) : (
        <ProfileToggle
          imageUrl={userProfile.images?.[0]?.url}
          displayName={userProfile.display_name}
        />
      )}
    </Box>
  );
};

export default Navbar;

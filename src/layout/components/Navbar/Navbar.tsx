import { EmojiEmotions } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import ProfileToggle from "./ProfileToggle";
import LoginButton from "../../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: {
          xs: "56px",
          sm: "64px",
        },
        px: 2,
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.6,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <EmojiEmotions
          sx={{
            color: "primary.main",
            fontSize: 28,
            verticalAlign: "middle",
          }}
        />
        <Typography
          color="textSecondary"
          variant="subtitle1"
          fontSize={20}
          fontWeight="bold"
        >
          SY Music
        </Typography>
        <EmojiEmotions
          sx={{
            color: "primary.main",
            fontSize: 28,
            verticalAlign: "middle",
          }}
        />
      </Box>
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

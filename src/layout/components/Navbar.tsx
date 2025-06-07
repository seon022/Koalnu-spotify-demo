import { Box, Icon, Typography } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
	const { data: userProfile } = useGetCurrentUserProfile();
	console.log(userProfile);
	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			height="64px"
			paddingRight={1}
		>
			{userProfile ? (
				userProfile.images?.length ? (
					<img
						src={userProfile.images[0]?.url}
						alt="profile_image"
						style={{ width: 40, height: 40, borderRadius: "50%" }}
					/>
				) : (
					<AccountCircleIcon sx={{ fontSize: 40 }} />
				)
			) : (
				<LoginButton />
			)}
		</Box>
	);
};

export default Navbar;

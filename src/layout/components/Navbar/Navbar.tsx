import { Box } from "@mui/material";
import React from "react";

import ProfileToggle from "./ProfileToggle";
import LoginButton from "../../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
	const { data: userProfile } = useGetCurrentUserProfile();
	const logout = useLogout();

	if (!userProfile)
		return (
			<Box
				display="flex"
				justifyContent="flex-end"
				alignItems="center"
				height="64px"
				pr={1}
			>
				<LoginButton />
			</Box>
		);

	const imageUrl = userProfile.images?.[0]?.url;

	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			height="64px"
			pr={1}
		>
			<ProfileToggle
				imageUrl={imageUrl}
				displayName={userProfile.display_name}
				onLogout={logout}
			/>
		</Box>
	);
};

export default Navbar;

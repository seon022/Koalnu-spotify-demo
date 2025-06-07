import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../../common/components/LoginButton";
import useLogout from "../../../hooks/useLogout";
import { Box } from "@mui/material";
import ProfileToggle from "./ProfileToggle";
import React from "react";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";

const Navbar = () => {
	const { data: userProfile } = useGetCurrentUserProfile();
	const logout = useLogout();

	React.useEffect(() => {
		console.log("userProfile changed:", userProfile);
	}, [userProfile]);

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

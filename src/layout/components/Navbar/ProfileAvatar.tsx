import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import React from "react";

interface ProfileAvatarProps {
	imageUrl?: string;
}

const ProfileAvatar = ({ imageUrl }: ProfileAvatarProps) => {
	return imageUrl ? (
		<Avatar src={imageUrl} alt="profile_image" sx={{ width: 40, height: 40 }} />
	) : (
		<AccountCircleIcon sx={{ fontSize: 40 }} />
	);
};

export default ProfileAvatar;

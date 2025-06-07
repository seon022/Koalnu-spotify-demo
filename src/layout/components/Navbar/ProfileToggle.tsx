import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";

import ProfileAvatar from "./ProfileAvatar";
import ProfileMenu from "./ProfileMenuList";

interface ProfileToggleProps {
	imageUrl?: string;
	displayName?: string;
	onLogout: () => void;
}

const ProfileToggle = ({
	imageUrl,
	displayName,
	onLogout,
}: ProfileToggleProps) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => setOpen((prev) => !prev);
	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<ProfileAvatar imageUrl={imageUrl} />
			</IconButton>
			<ProfileMenu
				open={open}
				anchorEl={anchorRef.current}
				displayName={displayName}
				onClose={handleClose}
				onLogout={() => {
					onLogout();
					setOpen(false);
				}}
			/>
		</>
	);
};

export default ProfileToggle;

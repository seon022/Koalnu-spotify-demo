import {
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from "@mui/material";
import React from "react";

interface ProfileMenuListProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	displayName?: string;
	onClose: (event: Event | React.SyntheticEvent) => void;
	onLogout: () => void;
}

const ProfileMenuList = ({
	open,
	anchorEl,
	displayName,
	onClose,
	onLogout,
}: ProfileMenuListProps) => (
	<Popper
		open={open}
		anchorEl={anchorEl}
		placement="bottom-end"
		transition
		disablePortal
		sx={{ zIndex: 1300 }}
	>
		{({ TransitionProps }) => (
			<Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
				<Paper sx={{ mt: 1 }}>
					<ClickAwayListener onClickAway={onClose}>
						<MenuList autoFocusItem={open} id="profile-menu">
							{displayName ? <MenuItem disabled>{displayName}</MenuItem> : ""}
							<MenuItem onClick={onLogout}>로그아웃</MenuItem>
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Grow>
		)}
	</Popper>
);

export default ProfileMenuList;

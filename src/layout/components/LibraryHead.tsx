import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Button,styled, Typography } from "@mui/material";
import React from "react";

const Head = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "8px",
	marginBottom: "10px",
});

const LibraryHead = () => {
	return (
		<Head>
			<Box display="flex">
				<BookmarkIcon sx={{ marginRight: "20px" }} />
				<Typography variant="h2" fontWeight={700}>
					Your Library
				</Typography>
			</Box>
			<Button>
				<AddIcon />
			</Button>
		</Head>
	);
};

export default LibraryHead;

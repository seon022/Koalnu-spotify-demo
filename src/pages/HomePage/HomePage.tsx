import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";

import NewReleases from "./components/NewReleases";

const HomePage = () => {
  return (
    <div>
      <NewReleases />
      <EmojiEmotionsIcon />
      <FavoriteIcon />
    </div>
  );
};

export default HomePage;

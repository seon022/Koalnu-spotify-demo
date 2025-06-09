import React from "react";

import PlaylistItem from "../../common/components/PlaylistItem";
import { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  return (
    <>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          name={item.name ?? "플레이리스트"}
          ownerName={item.owner?.display_name ?? "Unnamed"}
          imageUrl={item.images?.[0]?.url}
          type={item.type ?? ""}
        />
      ))}
    </>
  );
};

export default Playlist;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PlaylistItem from "../../common/components/PlaylistItem";
import { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };
  return (
    <>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          id={item.id ?? ""}
          handleClick={handleClick}
          name={item.name ?? "플레이리스트"}
          ownerName={item.owner?.display_name ?? "Unnamed"}
          imageUrl={item.images?.[0]?.url}
          type={item.type ?? ""}
          selected={item.id === selectedId}
        />
      ))}
    </>
  );
};

export default Playlist;

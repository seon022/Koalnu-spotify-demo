import React from "react";
import { Navigate, useParams } from "react-router-dom";

import PlaylistHeader from "./components/PlaylistHeader";
import useGetPlaylist from "../../hooks/useGetPlaylist";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });
  console.log("playlist", playlist);

  if (id === undefined) return <Navigate to="/" />;

  return (
    <div>
      <PlaylistHeader
        tracksNumber={playlist?.tracks?.items.length}
        imageUrl={playlist?.images?.[0]?.url ?? ""}
        name={playlist?.name ?? ""}
        ownerName={playlist?.owner?.display_name ?? ""}
      />
    </div>
  );
};

export default PlaylistDetailPage;

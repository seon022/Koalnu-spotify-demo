import React from "react";
import { Navigate, useParams } from "react-router-dom";

import PlaylistHeader from "./components/PlaylistHeader";
import useGetPlaylist from "../../hooks/useGetPlaylist";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });

  if (id === undefined) return <Navigate to="/" />;

  const numberOfSongs = playlist?.tracks?.items.length ?? 0;

  return (
    <div>
      <PlaylistHeader
        type={playlist?.type ?? ""}
        tracksNumber={numberOfSongs > 0 ? numberOfSongs : 0}
        imageUrl={playlist?.images?.[0]?.url ?? ""}
        name={playlist?.name ?? ""}
        ownerName={playlist?.owner?.display_name ?? ""}
      />
    </div>
  );
};

export default PlaylistDetailPage;

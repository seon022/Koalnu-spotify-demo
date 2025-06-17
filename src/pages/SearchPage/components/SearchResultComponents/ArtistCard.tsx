import React from "react";

import { Artist } from "../../../../models/artist";

interface ArtistCardProps {
  list: Artist[];
}
const ArtistCard = ({ list }: ArtistCardProps) => {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default ArtistCard;

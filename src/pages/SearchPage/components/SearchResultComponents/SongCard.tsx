import React from "react";

import { Track } from "../../../../models/track";

interface SongCardProps {
  list: Track[];
}
const SongCard = ({ list }: SongCardProps) => {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default SongCard;

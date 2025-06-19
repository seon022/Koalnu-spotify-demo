import { SearchResponse } from "../models/search";

export const findTopResult = (
  { artists, tracks, albums }: SearchResponse,
  keyword: string,
) => {
  if (!keyword) return null;
  const lowerKeyword = keyword.toLowerCase();
  const artist = artists?.items?.find((item) =>
    item.name?.toLowerCase().includes(lowerKeyword),
  );
  if (artist?.images?.[0].url.length) return artist;
  const track = tracks?.items?.find((item) =>
    item.name?.toLowerCase().includes(lowerKeyword),
  );
  if (track) return track;
  const album = albums?.items?.find((item) =>
    item.name.toLowerCase().includes(lowerKeyword),
  );
  if (album) return album;
  return null;
};

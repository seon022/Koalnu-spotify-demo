import { SimplifiedAlbum } from "./albums";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylsitRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}
export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  };
  is_local: boolean;
  track: Track | Episode;
}

export interface Track {
  album: SimplifiedAlbum;
  artists: Artist;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: string;
  uri: string;
  restriction?: {
    reason?: string;
  };
  show: Show;
}
export interface Show {
  available_markets: string[];
  copyrights: { text: string; type: string };
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}
export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

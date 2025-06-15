import {
  AddItemToPlaylistRequest,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetCurrentUserPlaylsitRequest,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "models/playlist";

import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylsitRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};
export const getPlaylist = async (
  params: GetPlaylistRequest,
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest,
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest,
): Promise<Playlist> => {
  try {
    const { name, playlist_public, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlist_public,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to crate playlist");
  }
};
export const AddItemToPlaylist = async (
  playlist_id: string,
  params: AddItemToPlaylistRequest,
): Promise<{ snapshot_id: string }> => {
  try {
    const { position, uris } = params;
    const response = await api.post(`/playlists/${playlist_id}/tracks`, {
      position,
      uris,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to add item to playlist");
  }
};

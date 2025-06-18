import axios from "axios";

import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const accessToken = useAuthStore.getState().accessToken;
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
export default api;

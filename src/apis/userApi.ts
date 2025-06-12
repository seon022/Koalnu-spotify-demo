import { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/me`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw error;
    }
    throw new Error("fail to fetch user profile");
  }
};

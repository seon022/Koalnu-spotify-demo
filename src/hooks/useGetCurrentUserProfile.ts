import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";
import { useAuthStore } from "../store/authStore";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: useAuthStore.getState().isLoggedIn,
  });
};

export default useGetCurrentUserProfile;

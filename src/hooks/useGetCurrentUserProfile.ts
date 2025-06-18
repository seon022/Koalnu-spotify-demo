import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";
import { useAuthStore } from "../store/authStore";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserProfile;

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    queryClient.removeQueries({ queryKey: ["current-user-profile"] });
    queryClient.removeQueries({ queryKey: ["current-user-playlist"] });
    navigate(location.pathname + location.search, { replace: true });
  };
};

export default useLogout;

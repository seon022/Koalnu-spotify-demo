import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["current-user-profile"] });

    navigate("/");
  };
};

export default useLogout;

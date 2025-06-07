import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
	const queryClient = useQueryClient();
	return () => {
		localStorage.removeItem("access_token");
		queryClient.removeQueries({ queryKey: ["current-user-profile"] });

		window.location.reload();
	};
};

export default useLogout;

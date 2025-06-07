import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getNewReleases } from "../apis/albumApi";

const useGetNewReleases = () => {
	const clientCredentialToken = useClientCredentialToken();
	return useQuery({
		queryKey: ["new-releases"],
		queryFn: () => {
			if (!clientCredentialToken) {
				throw new Error("No token available");
			}
			return getNewReleases(clientCredentialToken);
		},
	});
};

export default useGetNewReleases;

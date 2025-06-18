import { useMutation, useQueryClient } from "@tanstack/react-query";

import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";
import { useAuthStore } from "../store/authStore";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
    },
  });
};

export default useExchangeToken;

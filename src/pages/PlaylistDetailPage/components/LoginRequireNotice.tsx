import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

import LoginButton from "../../../common/components/LoginButton";

const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
`;

const LoginRequiredNotice = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100%"
    flexDirection="column"
    textAlign="center"
    sx={{
      padding: 6,
      borderRadius: 4,
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    }}
  >
    <EmojiEmotionsIcon
      sx={{
        fontSize: 60,
        color: "#3ebc6a",
        mb: 2,
        animation: `${wiggle} 2s infinite`,
      }}
    />
    <Typography variant="h5" fontWeight="bold" mb={3}>
      로그인이 필요합니다
    </Typography>

    <LoginButton />
  </Box>
);

export default LoginRequiredNotice;

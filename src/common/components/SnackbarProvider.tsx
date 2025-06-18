import { Alert, Snackbar } from "@mui/material";

import { useSnackbarStore } from "../../store/snackbarStore";

export default function SnackbarProvider() {
  const { message, severity, open, hide } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={hide}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={hide}>
        {message}
      </Alert>
    </Snackbar>
  );
}

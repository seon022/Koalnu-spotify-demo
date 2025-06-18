import { create } from "zustand";

interface SnackbarState {
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
  show: (msg: string, severity?: SnackbarState["severity"]) => void;
  hide: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  severity: "success",
  open: false,
  show: (msg, severity = "info") => set({ message: msg, severity, open: true }),
  hide: () => set({ open: false }),
}));

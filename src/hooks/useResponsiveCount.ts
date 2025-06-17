import { useTheme, useMediaQuery } from "@mui/material";

export function useResponsiveCount(size: {
  xs: number;
  sm: number;
  md: number;
  lg?: number;
  xl?: number;
}) {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  if (isXl) return size.xl ?? size.lg ?? size.md ?? size.sm ?? size.xs;
  if (isLg) return size.lg ?? size.md ?? size.sm ?? size.xs;
  if (isMd) return size.md ?? size.sm ?? size.xs;
  if (isSm) return size.sm ?? size.xs;
  return size.xs;
}

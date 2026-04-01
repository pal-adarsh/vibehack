"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/store/themeStore";
import type { ThemeMode } from "@/types";

interface UseThemeResult {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const cycleTheme = useThemeStore((state) => state.cycleTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme, cycleTheme };
}

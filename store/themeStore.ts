"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ThemeMode } from "@/types";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

const order: ThemeMode[] = ["dark", "light", "sunset"];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      cycleTheme: () => {
        const current = get().theme;
        const nextIndex = (order.indexOf(current) + 1) % order.length;
        set({ theme: order[nextIndex] });
      },
    }),
    {
      name: "sbos-theme",
    },
  ),
);

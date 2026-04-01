"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Idea } from "@/types";

interface UserState {
  score: number;
  streak: number;
  completedComplexityPoints: number;
  lastActiveDate: string;
  recomputeFromIdeas: (ideas: Idea[]) => void;
  markSessionCompleted: () => void;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      score: 220,
      streak: 1,
      completedComplexityPoints: 0,
      lastActiveDate: getToday(),
      recomputeFromIdeas: (ideas) => {
        const captured = ideas.length;
        const completed = ideas.filter((idea) => idea.status === "done").length;
        const completionRatio = captured === 0 ? 0 : completed / captured;

        const complexity = ideas
          .filter((idea) => idea.status === "done")
          .reduce((sum, idea) => sum + idea.timeEstimateHours + idea.subtasks.length * 2, 0);

        const aiEngagement = ideas.reduce(
          (sum, idea) => sum + Math.round(idea.confidenceScore / 25),
          0,
        );

        const score = Math.round(
          completionRatio * 350 + completed * 40 + complexity * 2 + get().streak * 14 + aiEngagement,
        );

        set({
          score: Math.min(1000, Math.max(0, score)),
          completedComplexityPoints: complexity,
        });
      },
      markSessionCompleted: () => {
        const today = getToday();
        const state = get();

        if (state.lastActiveDate === today) {
          return;
        }

        const prevDate = new Date(state.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - prevDate.getTime()) / 86400000);

        set({
          streak: diffDays === 1 ? state.streak + 1 : 1,
          lastActiveDate: today,
        });
      },
    }),
    {
      name: "sbos-user-store",
    },
  ),
);

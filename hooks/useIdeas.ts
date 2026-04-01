"use client";

import { useMemo } from "react";

import { daysSinceCreated, getTopExecutableIdeas } from "@/lib/priorityEngine";
import { useIdeaStore } from "@/store/ideaStore";
import { useUserStore } from "@/store/userStore";

export function useIdeas() {
  const ideas = useIdeaStore((state) => state.ideas);
  const addIdea = useIdeaStore((state) => state.addIdea);
  const updateIdea = useIdeaStore((state) => state.updateIdea);
  const removeIdea = useIdeaStore((state) => state.removeIdea);
  const moveIdea = useIdeaStore((state) => state.moveIdea);
  const toggleSubtask = useIdeaStore((state) => state.toggleSubtask);
  const setAutopsy = useIdeaStore((state) => state.setAutopsy);
  const recomputeFromIdeas = useUserStore((state) => state.recomputeFromIdeas);

  const columns = useMemo(
    () => ({
      idea: ideas.filter((idea) => idea.status === "idea"),
      planning: ideas.filter((idea) => idea.status === "planning"),
      "in-progress": ideas.filter((idea) => idea.status === "in-progress"),
      done: ideas.filter((idea) => idea.status === "done"),
    }),
    [ideas],
  );

  const topIdeas = useMemo(() => getTopExecutableIdeas(ideas, 3), [ideas]);

  const staleIdeas = useMemo(() => ideas.filter((idea) => daysSinceCreated(idea) >= 30), [ideas]);

  const refreshScore = () => recomputeFromIdeas(ideas);

  return {
    ideas,
    columns,
    topIdeas,
    staleIdeas,
    addIdea,
    updateIdea,
    removeIdea,
    moveIdea,
    toggleSubtask,
    setAutopsy,
    refreshScore,
  };
}

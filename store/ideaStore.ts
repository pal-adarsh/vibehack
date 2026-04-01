"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { calculateCompletion, calculatePriorityScore } from "@/lib/priorityEngine";
import { uid } from "@/lib/utils";
import type { Idea, IdeaAutopsyResult, IdeaStatus } from "@/types";

interface NewIdeaInput {
  title: string;
  goal: string;
  rawInput: string;
  summary: string;
  subtasks: string[];
  timeEstimateHours: number;
  firstStep: string;
  urgency: number;
  impact: number;
  tags: string[];
  dependencies: string[];
  resourceLinks: string[];
  confidenceScore: number;
  deadline?: string;
}

interface IdeaState {
  ideas: Idea[];
  addIdea: (input: NewIdeaInput) => string;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  removeIdea: (id: string) => void;
  moveIdea: (id: string, status: IdeaStatus) => void;
  toggleSubtask: (ideaId: string, subtaskId: string) => void;
  setAutopsy: (ideaId: string, result: IdeaAutopsyResult) => void;
}

function nowIso(): string {
  return new Date().toISOString();
}

const seedIdeas: Idea[] = [
  {
    id: "idea-demo-1",
    title: "Ship the SBOS landing page refresh",
    goal: "Publish a conversion-focused landing page for first users.",
    rawInput: "Need a strong landing page before announcing this product.",
    summary: "Design and launch a high-converting landing page for waitlist growth.",
    subtasks: [
      { id: uid("task"), title: "Write hero copy", done: true },
      { id: uid("task"), title: "Design social proof section", done: false },
      { id: uid("task"), title: "Set up email capture", done: false },
    ],
    timeEstimateHours: 12,
    firstStep: "Draft hero promise and supporting subheadline.",
    priorityScore: 78,
    urgency: 4,
    impact: 5,
    tags: ["marketing", "launch"],
    resourceLinks: [],
    dependencies: [],
    confidenceScore: 84,
    completion: 33,
    status: "in-progress",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: nowIso(),
    deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
  },
  {
    id: "idea-demo-2",
    title: "Build weekly execution report pipeline",
    goal: "Auto-generate weekly reflections and next-week recommendations.",
    rawInput: "Need report automation every Sunday.",
    summary: "Implement weekly reporting endpoint and dashboard panel.",
    subtasks: [
      { id: uid("task"), title: "Define report schema", done: true },
      { id: uid("task"), title: "Call AI endpoint", done: false },
      { id: uid("task"), title: "Build report UI", done: false },
    ],
    timeEstimateHours: 8,
    firstStep: "Define required report fields.",
    priorityScore: 69,
    urgency: 4,
    impact: 4,
    tags: ["ai", "reporting"],
    resourceLinks: [],
    dependencies: ["idea-demo-1"],
    confidenceScore: 76,
    completion: 33,
    status: "planning",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: nowIso(),
  },
];

export const useIdeaStore = create<IdeaState>()(
  persist(
    (set) => ({
      ideas: seedIdeas,
      addIdea: (input) => {
        const id = uid("idea");
        const createdAt = nowIso();
        const subtasks = input.subtasks.map((title) => ({ id: uid("task"), title, done: false }));

        const idea: Idea = {
          id,
          title: input.title,
          goal: input.goal,
          rawInput: input.rawInput,
          summary: input.summary,
          subtasks,
          timeEstimateHours: input.timeEstimateHours,
          firstStep: input.firstStep,
          urgency: input.urgency,
          impact: input.impact,
          priorityScore: calculatePriorityScore({
            urgency: input.urgency,
            impact: input.impact,
            createdAt,
            dependencyCount: input.dependencies.length,
          }),
          tags: input.tags,
          resourceLinks: input.resourceLinks,
          dependencies: input.dependencies,
          confidenceScore: input.confidenceScore,
          completion: calculateCompletion(subtasks),
          status: "idea",
          createdAt,
          updatedAt: createdAt,
          deadline: input.deadline,
        };

        set((state) => ({ ideas: [idea, ...state.ideas] }));
        return id;
      },
      updateIdea: (id, updates) => {
        set((state) => ({
          ideas: state.ideas.map((idea) => {
            if (idea.id !== id) {
              return idea;
            }

            const merged = { ...idea, ...updates, updatedAt: nowIso() };

            if (updates.urgency || updates.impact || updates.dependencies) {
              merged.priorityScore = calculatePriorityScore({
                urgency: merged.urgency,
                impact: merged.impact,
                createdAt: merged.createdAt,
                dependencyCount: merged.dependencies.length,
              });
            }

            return merged;
          }),
        }));
      },
      removeIdea: (id) => {
        set((state) => ({ ideas: state.ideas.filter((idea) => idea.id !== id) }));
      },
      moveIdea: (id, status) => {
        set((state) => ({
          ideas: state.ideas.map((idea) =>
            idea.id === id ? { ...idea, status, updatedAt: nowIso() } : idea,
          ),
        }));
      },
      toggleSubtask: (ideaId, subtaskId) => {
        set((state) => ({
          ideas: state.ideas.map((idea) => {
            if (idea.id !== ideaId) {
              return idea;
            }

            const subtasks = idea.subtasks.map((task) =>
              task.id === subtaskId ? { ...task, done: !task.done } : task,
            );

            const completion = calculateCompletion(subtasks);
            return {
              ...idea,
              subtasks,
              completion,
              status: completion === 100 ? "done" : idea.status,
              updatedAt: nowIso(),
            };
          }),
        }));
      },
      setAutopsy: (ideaId, result) => {
        set((state) => ({
          ideas: state.ideas.map((idea) =>
            idea.id === ideaId
              ? {
                  ...idea,
                  lastAutopsy: result,
                  updatedAt: nowIso(),
                }
              : idea,
          ),
        }));
      },
    }),
    {
      name: "sbos-idea-store",
      partialize: (state) => ({ ideas: state.ideas }),
    },
  ),
);

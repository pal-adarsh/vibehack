import type { Idea } from "@/types";

interface PriorityInput {
  urgency: number;
  impact: number;
  createdAt: string;
  dependencyCount: number;
}

export function calculatePriorityScore(input: PriorityInput): number {
  const urgencyWeight = 0.4;
  const impactWeight = 0.4;
  const ageWeight = 0.15;
  const dependencyWeight = 0.05;

  const ageDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(input.createdAt).getTime()) / 86400000),
  );

  const normalizedUrgency = Math.min(1, Math.max(0, input.urgency / 5));
  const normalizedImpact = Math.min(1, Math.max(0, input.impact / 5));
  const ageDecay = Math.min(1, ageDays / 30);
  const dependencyFactor = Math.min(1, input.dependencyCount / 6);

  const score =
    normalizedUrgency * urgencyWeight +
    normalizedImpact * impactWeight +
    ageDecay * ageWeight +
    dependencyFactor * dependencyWeight;

  return Math.round(score * 100);
}

export function getTopExecutableIdeas(ideas: Idea[], limit = 3): Idea[] {
  return [...ideas]
    .filter((idea) => idea.status !== "done")
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit);
}

export function calculateCompletion(subtasks: Idea["subtasks"]): number {
  if (subtasks.length === 0) {
    return 0;
  }

  const doneCount = subtasks.filter((task) => task.done).length;
  return Math.round((doneCount / subtasks.length) * 100);
}

export function daysSinceCreated(idea: Idea): number {
  return Math.floor((Date.now() - new Date(idea.createdAt).getTime()) / 86400000);
}

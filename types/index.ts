export type ThemeMode = "dark" | "light" | "sunset";

export type IdeaStatus = "idea" | "planning" | "in-progress" | "done";

export interface IdeaSubtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Idea {
  id: string;
  title: string;
  goal: string;
  rawInput: string;
  summary: string;
  subtasks: IdeaSubtask[];
  timeEstimateHours: number;
  firstStep: string;
  priorityScore: number;
  urgency: number;
  impact: number;
  tags: string[];
  resourceLinks: string[];
  dependencies: string[];
  confidenceScore: number;
  completion: number;
  status: IdeaStatus;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  lastAutopsy?: IdeaAutopsyResult;
  roomId?: string;
}

export interface IdeaAutopsyResult {
  diagnosis: string;
  blockers: string[];
  revivalPlan: string[];
  archiveRecommendation: boolean;
  archiveReason?: string;
}

export interface SummarizerResult {
  summary: string[];
  actionPoints: string[];
  keyQuestions: string[];
  relatedTags: string[];
}

export interface WeeklyReport {
  period: string;
  completedIdeas: string[];
  stalledIdeas: { title: string; reason: string }[];
  productivityTrend: string;
  focusRecommendations: string[];
}

export interface UserStats {
  score: number;
  streak: number;
  completedComplexityPoints: number;
  lastActiveDate: string;
}

export interface QueueItem {
  id: string;
  endpoint: string;
  payload: unknown;
  createdAt: string;
}

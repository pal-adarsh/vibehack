"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

import { DrawCheckIcon, PriorityMorphIcon } from "@/components/ui/AnimatedIcons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { Idea } from "@/types";

interface IdeaCardProps {
  idea: Idea;
  onToggleSubtask?: (subtaskId: string) => void;
  compact?: boolean;
}

export function IdeaCard({ idea, onToggleSubtask, compact = false }: IdeaCardProps) {
  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.01} className="h-full">
      <Card className="h-full space-y-3" data-cursor="ring">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-ink">{idea.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{idea.goal}</p>
          </div>
          <Badge
            label={`${idea.priorityScore}`}
            tone={idea.priorityScore >= 80 ? "hot" : idea.priorityScore >= 55 ? "warn" : "default"}
            className="gap-1"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <PriorityMorphIcon level={idea.priorityScore} /> Priority
          </span>
          <span>ETA {idea.timeEstimateHours}h</span>
          <span>Confidence {idea.confidenceScore}%</span>
          {idea.deadline ? <span>Due {formatDate(idea.deadline)}</span> : null}
        </div>

        <p className="text-xs text-ink-muted">First step: {idea.firstStep}</p>

        <div className="space-y-1.5">
          {(compact ? idea.subtasks.slice(0, 2) : idea.subtasks).map((task) => (
            <button
              key={task.id}
              type="button"
              className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm text-ink-muted hover:bg-panel"
              onClick={() => {
                onToggleSubtask?.(task.id);
                if (!task.done) {
                  confetti({ particleCount: 45, spread: 60, origin: { y: 0.74 } });
                }
              }}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded border ${
                  task.done ? "border-[#2f9d61] text-[#2f9d61]" : "border-border text-transparent"
                }`}
              >
                <DrawCheckIcon checked={task.done} />
              </span>
              <span className={task.done ? "line-through opacity-70" : ""}>{task.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge label={`${idea.completion}% complete`} />
          <Button asChild variant="ghost" className="px-2 py-1 text-xs">
            <Link href={`/ideas/${idea.id}`}>Open</Link>
          </Button>
        </div>
      </Card>
    </Tilt>
  );
}

"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";

import { KanbanCard } from "@/components/board/KanbanCard";
import { KanbanColumn } from "@/components/board/KanbanColumn";
import { AppScaffold } from "@/components/layout/AppScaffold";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useIdeas } from "@/hooks/useIdeas";
import { formatDate } from "@/lib/utils";
import type { IdeaStatus } from "@/types";

const orderedStatuses: Array<{ key: IdeaStatus; label: string }> = [
  { key: "idea", label: "Idea" },
  { key: "planning", label: "Planning" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function BoardPage() {
  const { columns, ideas, moveIdea } = useIdeas();
  const [mode, setMode] = useState<"kanban" | "timeline">("kanban");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activeIdea = useMemo(() => ideas.find((idea) => idea.id === activeId), [ideas, activeId]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeIdeaId = String(active.id);

    const overStatus = over.data.current?.status as IdeaStatus | undefined;

    if (overStatus) {
      moveIdea(activeIdeaId, overStatus);
      return;
    }

    const fallbackColumn = orderedStatuses.find((status) => status.key === String(over.id));
    if (fallbackColumn) {
      moveIdea(activeIdeaId, fallbackColumn.key);
    }
  };

  return (
    <AppScaffold>
      <Card className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">Execution Board</h2>
        <div className="flex gap-2">
          <Button variant={mode === "kanban" ? "primary" : "secondary"} onClick={() => setMode("kanban")}>
            Kanban
          </Button>
          <Button
            variant={mode === "timeline" ? "primary" : "secondary"}
            onClick={() => setMode("timeline")}
          >
            Timeline
          </Button>
        </div>
      </Card>

      {mode === "kanban" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid gap-4 lg:grid-cols-4">
            {orderedStatuses.map((status) => (
              <KanbanColumn
                key={status.key}
                status={status.key}
                title={status.label}
                ideas={columns[status.key]}
              />
            ))}
          </div>
          <DragOverlay>{activeIdea ? <KanbanCard idea={activeIdea} /> : null}</DragOverlay>
        </DndContext>
      ) : (
        <Card>
          <p className="mb-3 text-sm text-ink-muted">Timeline roadmap with deadline and effort visibility.</p>
          <div className="space-y-3">
            {ideas
              .filter((idea) => idea.status !== "done")
              .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""))
              .map((idea) => (
                <div key={idea.id} className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">{idea.title}</p>
                    <Badge label={idea.deadline ? formatDate(idea.deadline) : "No deadline"} />
                  </div>
                  <div className="h-2 rounded-full bg-bg-soft">
                    <div className="h-2 rounded-full bg-accent" style={{ width: `${idea.completion}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </AppScaffold>
  );
}

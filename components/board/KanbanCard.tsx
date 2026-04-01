"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Badge } from "@/components/ui/Badge";
import type { Idea } from "@/types";

interface KanbanCardProps {
  idea: Idea;
}

export function KanbanCard({ idea }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: idea.id,
    data: { type: "idea", status: idea.status },
  });

  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-xl border border-border bg-bg-soft p-3 ${isDragging ? "opacity-60" : ""}`}
      {...attributes}
      {...listeners}
      data-cursor="drag"
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{idea.title}</p>
        <Badge label={`${idea.priorityScore}`} tone={idea.priorityScore > 75 ? "hot" : "warn"} />
      </div>
      <p className="text-xs text-ink-muted">{idea.goal}</p>
      <p className="mt-2 text-xs text-ink-muted">{idea.completion}% complete</p>
    </article>
  );
}

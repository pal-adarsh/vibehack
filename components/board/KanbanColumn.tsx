"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { KanbanCard } from "@/components/board/KanbanCard";
import { Badge } from "@/components/ui/Badge";
import type { Idea, IdeaStatus } from "@/types";

interface KanbanColumnProps {
  status: IdeaStatus;
  title: string;
  ideas: Idea[];
}

export function KanbanColumn({ status, title, ideas }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status, data: { type: "column", status } });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-55 rounded-2xl border border-border bg-panel/70 p-3 ${isOver ? "ring-2 ring-accent" : ""}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <Badge label={`${ideas.length}`} />
      </div>
      <SortableContext items={ideas.map((idea) => idea.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {ideas.map((idea) => (
            <KanbanCard key={idea.id} idea={idea} />
          ))}
        </div>
      </SortableContext>
    </section>
  );
}

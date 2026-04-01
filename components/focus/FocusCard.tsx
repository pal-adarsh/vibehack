import { Card } from "@/components/ui/Card";
import type { Idea } from "@/types";

export function FocusCard({ idea }: { idea: Idea | undefined }) {
  if (!idea) {
    return (
      <Card>
        <p className="text-sm text-ink-muted">No active task. Pick one from your board.</p>
      </Card>
    );
  }

  return (
    <Card className="space-y-3">
      <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Today&apos;s Focus</p>
      <h2 className="text-2xl font-semibold text-ink">{idea.title}</h2>
      <p className="text-sm text-ink-muted">{idea.goal}</p>
      <div className="space-y-1 text-sm text-ink-muted">
        {idea.subtasks.filter((task) => !task.done).slice(0, 3).map((task) => (
          <p key={task.id}>- {task.title}</p>
        ))}
      </div>
    </Card>
  );
}

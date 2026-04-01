"use client";

import { useParams } from "next/navigation";

import { IdeaAutopsy } from "@/components/ideas/IdeaAutopsy";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { AppScaffold } from "@/components/layout/AppScaffold";
import { Card } from "@/components/ui/Card";
import { useIdeas } from "@/hooks/useIdeas";

export default function IdeaDetailPage() {
  const params = useParams<{ id: string }>();
  const { ideas, toggleSubtask, setAutopsy } = useIdeas();

  const idea = ideas.find((entry) => entry.id === params.id);

  if (!idea) {
    return (
      <AppScaffold>
        <Card>
          <p className="text-sm text-ink-muted">Idea not found.</p>
        </Card>
      </AppScaffold>
    );
  }

  return (
    <AppScaffold>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <IdeaCard idea={idea} onToggleSubtask={(subtaskId) => toggleSubtask(idea.id, subtaskId)} />
        <IdeaAutopsy
          idea={idea}
          onComplete={(result) => {
            setAutopsy(idea.id, result);
          }}
        />
      </div>

      <Card className="mt-4">
        <h3 className="mb-2 text-base font-semibold text-ink">Related Tags</h3>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-ink-muted">
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </AppScaffold>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { IdeaCard } from "@/components/ideas/IdeaCard";
import { IdeaForm } from "@/components/ideas/IdeaForm";
import { AppScaffold } from "@/components/layout/AppScaffold";
import { Card } from "@/components/ui/Card";
import { useIdeas } from "@/hooks/useIdeas";

export default function IdeasPage() {
  const { ideas, toggleSubtask } = useIdeas();
  const [mobileIndex, setMobileIndex] = useState(0);

  const mobileIdea = useMemo(() => ideas[mobileIndex], [ideas, mobileIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setMobileIndex((prev) => Math.min(ideas.length - 1, prev + 1)),
    onSwipedRight: () => setMobileIndex((prev) => Math.max(0, prev - 1)),
    trackMouse: true,
  });

  return (
    <AppScaffold>
      <div className="space-y-4">
        <IdeaForm onIdeaCreated={() => setMobileIndex(0)} />

        <Card className="sm:hidden" {...handlers}>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ink-muted">Swipeable Stack</p>
          {mobileIdea ? (
            <IdeaCard
              idea={mobileIdea}
              onToggleSubtask={(subtaskId) => toggleSubtask(mobileIdea.id, subtaskId)}
            />
          ) : (
            <p className="text-sm text-ink-muted">No ideas yet.</p>
          )}
        </Card>

        <div className="hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              compact
              onToggleSubtask={(subtaskId) => toggleSubtask(idea.id, subtaskId)}
            />
          ))}
        </div>
      </div>
    </AppScaffold>
  );
}

"use client";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { TopIdeas } from "@/components/dashboard/TopIdeas";
import { Card } from "@/components/ui/Card";
import { useIdeas } from "@/hooks/useIdeas";
import { useUserStore } from "@/store/userStore";

export default function DashboardPage() {
  const { ideas, topIdeas, columns, staleIdeas } = useIdeas();
  const score = useUserStore((state) => state.score);
  const streak = useUserStore((state) => state.streak);

  return (
    <AppScaffold>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.4fr]">
        <Card className="grid place-items-center">
          <ScoreRing score={score} />
        </Card>
        <TopIdeas ideas={topIdeas} />
      </div>

      <div className="mt-4">
        <StatsGrid
          captured={ideas.length}
          inProgress={columns["in-progress"].length}
          done={columns.done.length}
          streak={streak}
        />
      </div>

      <Card className="mt-4">
        <h2 className="mb-2 text-lg font-semibold text-ink">Idea Autopsy Queue</h2>
        <p className="text-sm text-ink-muted">
          {staleIdeas.length > 0
            ? `${staleIdeas.length} ideas are stale for 30+ days and need diagnosis.`
            : "No stale ideas right now."}
        </p>
      </Card>
    </AppScaffold>
  );
}

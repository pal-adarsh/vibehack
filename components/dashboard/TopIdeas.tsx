import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Idea } from "@/types";

export function TopIdeas({ ideas }: { ideas: Idea[] }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Top 3 Most Executable Ideas</h2>
        <Badge label="Today" />
      </div>
      <div className="space-y-2">
        {ideas.map((idea, index) => (
          <Link
            key={idea.id}
            href={`/ideas/${idea.id}`}
            className="block rounded-xl border border-border p-3 transition hover:bg-bg-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">{index + 1}. {idea.title}</p>
                <p className="text-xs text-ink-muted">{idea.firstStep}</p>
              </div>
              <Badge label={`${idea.priorityScore}`} tone="warn" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

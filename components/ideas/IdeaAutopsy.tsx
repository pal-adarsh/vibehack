"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import type { Idea, IdeaAutopsyResult } from "@/types";

interface IdeaAutopsyProps {
  idea: Idea;
  onComplete: (result: IdeaAutopsyResult) => void;
}

export function IdeaAutopsy({ idea, onComplete }: IdeaAutopsyProps) {
  const [loading, setLoading] = useState(false);
  const { push } = useToast();
  const { enqueue } = useOfflineQueue();

  const runAutopsy = async () => {
    setLoading(true);
    const requestPayload = { idea };

    if (!navigator.onLine) {
      await enqueue("/api/autopsy", requestPayload);
      push({ title: "Queued autopsy", description: "Will run after reconnect.", tone: "info" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/autopsy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error("Autopsy failed.");
      }

      const data = (await response.json()) as IdeaAutopsyResult;
      onComplete(data);
      push({ title: "Autopsy complete", tone: "success" });
    } catch (error) {
      await enqueue("/api/autopsy", requestPayload);
      push({
        title: "Autopsy failed",
        description:
          error instanceof Error
            ? `${error.message} Request queued.`
            : "Unknown error. Request queued.",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-ink">Idea Autopsy</h3>
        <p className="text-sm text-ink-muted">Diagnose why this idea has stalled and get a revival plan.</p>
      </div>
      <Button onClick={runAutopsy} disabled={loading}>
        {loading ? "Running diagnosis..." : "Run Autopsy"}
      </Button>
      {idea.lastAutopsy ? (
        <div className="space-y-2 rounded-lg border border-border bg-bg-soft p-3 text-sm">
          <p className="font-medium text-ink">{idea.lastAutopsy.diagnosis}</p>
          <ul className="space-y-1 text-ink-muted">
            {idea.lastAutopsy.blockers.map((blocker) => (
              <li key={blocker}>- {blocker}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}

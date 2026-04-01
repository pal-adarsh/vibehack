"use client";

import { useState } from "react";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import { useIdeas } from "@/hooks/useIdeas";
import type { WeeklyReport } from "@/types";

export default function ReportPage() {
  const { ideas } = useIdeas();
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const { push } = useToast();
  const { enqueue } = useOfflineQueue();

  const generate = async () => {
    setLoading(true);
    const requestPayload = { ideas };

    if (!navigator.onLine) {
      await enqueue("/api/weekly-report", requestPayload);
      push({ title: "Queued report request", description: "Will run when online.", tone: "info" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });
      if (!response.ok) {
        throw new Error("Report generation failed.");
      }

      const data = (await response.json()) as WeeklyReport;
      setReport(data);
      push({ title: "Weekly report generated", tone: "success" });
    } catch (error) {
      await enqueue("/api/weekly-report", requestPayload);
      push({
        title: "Report failed",
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
    <AppScaffold>
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">Weekly Execution Debrief</h2>
        <p className="text-sm text-ink-muted">
          Generate your Sunday reflection: wins, stalls, trend, and next-week focus.
        </p>
        <Button onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate This Week's Report"}
        </Button>
      </Card>

      {report ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="mb-2 text-base font-semibold text-ink">Completed Ideas</h3>
            <ul className="space-y-1 text-sm text-ink-muted">
              {report.completedIdeas.map((idea) => (
                <li key={idea}>- {idea}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-2 text-base font-semibold text-ink">Stalled Ideas</h3>
            <ul className="space-y-1 text-sm text-ink-muted">
              {report.stalledIdeas.map((idea) => (
                <li key={idea.title}>
                  - {idea.title}: {idea.reason}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="mb-2 text-base font-semibold text-ink">Focus Recommendations</h3>
            <ul className="space-y-1 text-sm text-ink-muted">
              {report.focusRecommendations.map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
    </AppScaffold>
  );
}

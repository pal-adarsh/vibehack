"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import { isLikelyUrl } from "@/lib/utils";
import type { SummarizerResult } from "@/types";

export function SummarizerPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummarizerResult | null>(null);
  const { push } = useToast();
  const { enqueue } = useOfflineQueue();

  const summarize = async () => {
    if (input.trim().length < 16) {
      push({ title: "Input too short", description: "Paste more context or a URL.", tone: "error" });
      return;
    }

    setLoading(true);
    const requestPayload = {
      input,
      sourceType: isLikelyUrl(input) ? "url" : "text",
    };

    if (!navigator.onLine) {
      await enqueue("/api/summarize", requestPayload);
      push({ title: "Queued for sync", description: "Will summarize once online.", tone: "info" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error("Summarization failed.");
      }

      const data = (await response.json()) as SummarizerResult;
      setResult(data);
      push({ title: "Summary generated", tone: "success" });
    } catch (error) {
      await enqueue("/api/summarize", requestPayload);
      push({
        title: "Summarizer failed",
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
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">AI Paragraph Summarizer</h2>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={12}
          placeholder="Paste an article, notes, transcript, or URL."
          className="w-full rounded-xl border border-border bg-bg-soft px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
        />
        <Button onClick={summarize} disabled={loading} data-cursor={loading ? "loading" : "ring"}>
          {loading ? "Analyzing..." : "Extract Insight"}
        </Button>
      </Card>
      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-ink">Insight Cards</h3>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : null}
        {!loading && result ? (
          <div className="space-y-3 text-sm text-ink-muted">
            <section>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-ink">TL;DR</p>
              <ul className="space-y-1">
                {result.summary.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-ink">Action Points</p>
              <ul className="space-y-1">
                {result.actionPoints.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-ink">Key Questions</p>
              <ul className="space-y-1">
                {result.keyQuestions.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

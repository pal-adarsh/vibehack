"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import { supportsSpeechRecognition, transcribeOnce } from "@/lib/speech";
import { isLikelyUrl } from "@/lib/utils";
import { useIdeaStore } from "@/store/ideaStore";

interface StructuredIdeaResponse {
  title: string;
  goal: string;
  rawInput: string;
  summary: string;
  subtasks: string[];
  timeEstimateHours: number;
  firstStep: string;
  priorityScore: number;
  urgency: number;
  impact: number;
  tags: string[];
  resourceLinks: string[];
  dependencies: string[];
  confidenceScore: number;
  deadline?: string;
}

interface IdeaFormProps {
  onIdeaCreated: (ideaId: string) => void;
}

export function IdeaForm({ onIdeaCreated }: IdeaFormProps) {
  const [rawIdea, setRawIdea] = useState("");
  const [urgency, setUrgency] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { push } = useToast();
  const { enqueue } = useOfflineQueue();
  const addIdea = useIdeaStore((state) => state.addIdea);

  const submit = async () => {
    if (rawIdea.trim().length < 8) {
      push({ title: "More detail needed", description: "Add at least a sentence.", tone: "error" });
      return;
    }

    const requestPayload = {
      input: rawIdea,
      urgency,
      sourceType: isLikelyUrl(rawIdea) ? "url" : "text",
    };

    if (!navigator.onLine) {
      await enqueue("/api/structure-idea", requestPayload);
      push({
        title: "Saved to offline queue",
        description: "Idea structuring will retry automatically when online.",
        tone: "info",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/structure-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error("Could not structure idea.");
      }

      const payload = (await response.json()) as { idea: StructuredIdeaResponse };
      const createdId = addIdea({
        title: payload.idea.title,
        goal: payload.idea.goal,
        rawInput: rawIdea,
        summary: payload.idea.summary,
        subtasks: payload.idea.subtasks,
        timeEstimateHours: payload.idea.timeEstimateHours,
        firstStep: payload.idea.firstStep,
        urgency,
        impact: payload.idea.impact,
        tags: payload.idea.tags,
        dependencies: payload.idea.dependencies,
        resourceLinks: payload.idea.resourceLinks,
        confidenceScore: payload.idea.confidenceScore,
        deadline: payload.idea.deadline,
      });

      onIdeaCreated(createdId);
      setRawIdea("");
      setUrgency(3);
      push({ title: "Idea structured", tone: "success" });
    } catch (error) {
      await enqueue("/api/structure-idea", requestPayload);
      push({
        title: "AI failed to process",
        description:
          error instanceof Error
            ? `${error.message} Saved to offline queue.`
            : "Unknown error. Saved to offline queue.",
        tone: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const captureVoice = async () => {
    if (!supportsSpeechRecognition()) {
      push({
        title: "Voice unavailable",
        description: "Use Chrome/Edge over HTTPS or localhost to enable Web Speech API.",
        tone: "error",
      });
      return;
    }

    setIsRecording(true);
    try {
      const result = await transcribeOnce();
      setRawIdea(result.transcript);
      push({
        title: "Voice captured",
        description: result.confidence < 0.7 ? "Low-confidence words may need edits." : undefined,
        tone: "info",
      });
    } catch (error) {
      push({
        title: "Voice capture failed",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-ink">Idea Inbox</h2>
        <p className="text-sm text-ink-muted">Drop a thought, URL, or transcript. AI converts it into execution.</p>
      </div>

      <textarea
        value={rawIdea}
        onChange={(event) => setRawIdea(event.target.value)}
        rows={6}
        placeholder="Build a community for indie developers in India..."
        className="w-full rounded-xl border border-border bg-bg-soft px-3 py-2 text-sm text-ink outline-none ring-accent transition focus:ring-2"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          Urgency
          <input
            type="range"
            min={1}
            max={5}
            value={urgency}
            onChange={(event) => setUrgency(Number(event.target.value))}
            className="accent-accent"
          />
          <span>{urgency}</span>
        </label>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={captureVoice} disabled={isRecording} data-cursor="ring">
            {isRecording ? "Listening..." : "Voice to Idea"}
          </Button>
          <Button onClick={submit} disabled={isLoading} data-cursor={isLoading ? "loading" : "ring"}>
            {isLoading ? "Structuring..." : "Structure Idea"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

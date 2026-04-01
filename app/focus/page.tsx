"use client";

import { useState } from "react";

import { FocusCard } from "@/components/focus/FocusCard";
import { AmbientPlayer } from "@/components/focus/AmbientPlayer";
import { PomodoroTimer } from "@/components/focus/PomodoroTimer";
import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useIdeas } from "@/hooks/useIdeas";
import { useUserStore } from "@/store/userStore";

export default function FocusPage() {
  const { topIdeas, moveIdea } = useIdeas();
  const [locked, setLocked] = useState(false);
  const markSessionCompleted = useUserStore((state) => state.markSessionCompleted);
  const { push } = useToast();

  const activeIdea = topIdeas[0];

  const finishSession = () => {
    markSessionCompleted();
    if (activeIdea) {
      moveIdea(activeIdea.id, "in-progress");
    }
    push({ title: "Focus session logged", tone: "success" });
  };

  return (
    <AppScaffold>
      <div className="space-y-4">
        <Card className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-ink">Daily Focus Mode</h2>
            <p className="text-sm text-ink-muted">Lock in with one idea and a guided pomodoro cycle.</p>
          </div>
          <Button variant="secondary" onClick={() => setLocked((prev) => !prev)}>
            {locked ? "Unlock Navigation" : "Lock Navigation"}
          </Button>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <FocusCard idea={activeIdea} />
          <PomodoroTimer onCompleted={finishSession} />
        </div>

        <AmbientPlayer />

        {locked ? (
          <Card>
            <p className="text-sm text-ink-muted">
              Navigation is intentionally minimized. Stay in this view until your timer is complete.
            </p>
          </Card>
        ) : null}
      </div>
    </AppScaffold>
  );
}

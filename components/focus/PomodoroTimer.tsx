"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useFocusMode } from "@/hooks/useFocusMode";

interface PomodoroTimerProps {
  onCompleted: () => void;
}

export function PomodoroTimer({ onCompleted }: PomodoroTimerProps) {
  const { timerLabel, isRunning, progress, start, pause, reset, remainingSeconds } = useFocusMode(25);

  return (
    <Card className="space-y-3 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Pomodoro</p>
      <p className="text-5xl font-black text-ink tabular-nums">{timerLabel}</p>
      <div className="h-2 rounded-full bg-bg-soft">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={isRunning ? pause : start}>{isRunning ? "Pause" : "Start"}</Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (remainingSeconds === 0) {
              onCompleted();
            }
            reset();
          }}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}

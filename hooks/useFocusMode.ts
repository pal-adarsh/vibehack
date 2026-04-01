"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface FocusState {
  isRunning: boolean;
  remainingSeconds: number;
  totalSeconds: number;
  progress: number;
}

export function useFocusMode(initialMinutes = 25) {
  const [state, setState] = useState<FocusState>({
    isRunning: false,
    remainingSeconds: initialMinutes * 60,
    totalSeconds: initialMinutes * 60,
    progress: 0,
  });

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setState((prev) => {
        const remaining = Math.max(0, prev.remainingSeconds - 1);
        const progress = Math.round(((prev.totalSeconds - remaining) / prev.totalSeconds) * 100);

        return {
          ...prev,
          isRunning: remaining > 0,
          remainingSeconds: remaining,
          progress,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isRunning]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback((minutes = initialMinutes) => {
    const total = minutes * 60;
    setState({
      isRunning: false,
      remainingSeconds: total,
      totalSeconds: total,
      progress: 0,
    });
  }, [initialMinutes]);

  const label = useMemo(() => {
    const minutes = Math.floor(state.remainingSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (state.remainingSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [state.remainingSeconds]);

  return {
    ...state,
    timerLabel: label,
    start,
    pause,
    reset,
  };
}

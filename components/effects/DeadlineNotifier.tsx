"use client";

import { useEffect, useRef } from "react";

import { useIdeaStore } from "@/store/ideaStore";

export function DeadlineNotifier() {
  const ideas = useIdeaStore((state) => state.ideas);
  const notifiedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const run = () => {
      if (typeof Notification === "undefined" || Notification.permission !== "granted") {
        return;
      }

      const now = Date.now();
      const in24Hours = now + 24 * 60 * 60 * 1000;

      for (const idea of ideas) {
        if (!idea.deadline || idea.status === "done") {
          continue;
        }

        const deadlineTime = new Date(idea.deadline).getTime();
        const token = `${idea.id}:${new Date(idea.deadline).toDateString()}`;

        if (deadlineTime > now && deadlineTime <= in24Hours && !notifiedRef.current.has(token)) {
          notifiedRef.current.add(token);
          new Notification("Deadline reminder", {
            body: `${idea.title} is due within 24 hours.`,
          });
        }
      }

      const day = new Date();
      const reportToken = `weekly:${day.toDateString()}`;
      if (day.getDay() === 0 && !notifiedRef.current.has(reportToken)) {
        notifiedRef.current.add(reportToken);
        new Notification("Weekly Execution Debrief", {
          body: "Your Sunday report is ready in Second Brain OS.",
        });
      }
    };

    run();
    const timer = setInterval(run, 60000);
    return () => clearInterval(timer);
  }, [ideas]);

  return null;
}

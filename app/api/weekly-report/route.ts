import { NextResponse } from "next/server";

import { runGeminiJson, weeklyReportSchema } from "@/lib/gemini";
import type { Idea } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { ideas?: Idea[] };
    const ideas = body.ideas ?? [];

    const completed = ideas.filter((idea) => idea.status === "done").map((idea) => idea.title);
    const stalled = ideas
      .filter((idea) => idea.status !== "done" && idea.completion < 40)
      .map((idea) => ({ title: idea.title, reason: "Low completion this week" }));

    const prompt = `You are a weekly execution coach.
Create a concise weekly debrief in JSON keys:
period, completedIdeas[], stalledIdeas[{title,reason}], productivityTrend, focusRecommendations[]

Completed ideas: ${completed.join(" | ") || "none"}
Stalled ideas: ${stalled.map((item) => `${item.title}:${item.reason}`).join(" | ") || "none"}`;

    const fallback = {
      period: "This Week",
      completedIdeas: completed,
      stalledIdeas: stalled,
      productivityTrend:
        completed.length > stalled.length
          ? "Momentum improved with stronger completion rate."
          : "Momentum is flat and needs tighter prioritization.",
      focusRecommendations: [
        "Pick one high-impact idea and finish it before starting a new one.",
        "Set explicit deadlines for every planning-stage item.",
        "Use one daily focus sprint on your top executable idea.",
      ],
    };

    const result = await runGeminiJson({ prompt, schema: weeklyReportSchema, fallback });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate weekly report.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

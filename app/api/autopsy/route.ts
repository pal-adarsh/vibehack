import { NextResponse } from "next/server";

import { autopsySchema, runGeminiJson } from "@/lib/gemini";
import type { Idea } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idea?: Idea };
    if (!body.idea) {
      return NextResponse.json({ error: "Idea payload required." }, { status: 400 });
    }

    const ageDays = Math.floor(
      (Date.now() - new Date(body.idea.createdAt).getTime()) / 86400000,
    );

    const prompt = `You are an idea execution diagnostician.
Given this stalled idea, explain why progress is blocked and produce a revival plan.
Return strict JSON keys: diagnosis, blockers[], revivalPlan[], archiveRecommendation, archiveReason.

Idea title: ${body.idea.title}
Goal: ${body.idea.goal}
Completion: ${body.idea.completion}%
Age: ${ageDays} days
Subtasks: ${body.idea.subtasks.map((task) => task.title).join(" | ")}`;

    const fallback = {
      diagnosis:
        "The idea is broad and lacks a concrete short-term deliverable, so momentum never started.",
      blockers: [
        "No hard deadline",
        "First milestone is not explicit",
        "Scope may be too large for current capacity",
      ],
      revivalPlan: [
        "Define one deliverable due in 48 hours.",
        "Break the idea into a one-week sprint.",
        "Schedule 45 minutes today for the first subtask.",
      ],
      archiveRecommendation: ageDays > 45,
      archiveReason: ageDays > 45 ? "Low traction over extended period." : undefined,
    };

    const result = await runGeminiJson({ prompt, schema: autopsySchema, fallback });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to run autopsy.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

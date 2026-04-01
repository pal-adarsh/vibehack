import { NextResponse } from "next/server";

import { runGeminiJson, structureIdeaSchema, fetchReadableUrlContent } from "@/lib/gemini";
import { clamp } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      input?: string;
      urgency?: number;
      sourceType?: "text" | "url";
    };

    const input = body.input?.trim();
    if (!input || input.length < 8) {
      return NextResponse.json({ error: "Input must be at least 8 characters." }, { status: 400 });
    }

    let sourceText = input;
    if (body.sourceType === "url") {
      sourceText = await fetchReadableUrlContent(input);
    }

    const urgency = clamp(body.urgency ?? 3, 1, 5);

    const prompt = `You are an execution planning engine.
Convert the following raw idea into structured JSON for immediate action.
Return only valid JSON with keys:
- title
- goal
- summary
- subtasks (3 to 7 actionable short tasks)
- timeEstimateHours (number)
- firstStep
- priorityScore (0-100)
- confidenceScore (0-100)
- tags (array)
- dependencies (array)
- resourceLinks (array)

Urgency: ${urgency}/5
Input:\n${sourceText}`;

    const fallback = {
      title: input.slice(0, 60),
      goal: "Transform this idea into a deliverable outcome.",
      summary: input,
      subtasks: [
        "Define the exact deliverable",
        "Break work into three milestones",
        "Block time on calendar for first milestone",
      ],
      timeEstimateHours: 6,
      firstStep: "Clarify the smallest shippable version today.",
      priorityScore: 64,
      confidenceScore: 70,
      tags: ["general"],
      dependencies: [],
      resourceLinks: [],
    };

    const result = await runGeminiJson({ prompt, schema: structureIdeaSchema, fallback });

    return NextResponse.json({
      idea: {
        ...result,
        urgency,
        impact: Math.max(1, Math.min(5, Math.round((result.priorityScore / 100) * 5))),
        rawInput: input,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to structure idea.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

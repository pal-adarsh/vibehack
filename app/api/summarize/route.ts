import { NextResponse } from "next/server";

import { fetchReadableUrlContent, runGeminiJson, summarizeSchema } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { input?: string; sourceType?: "text" | "url" };

    const input = body.input?.trim();
    if (!input || input.length < 16) {
      return NextResponse.json({ error: "Input must be at least 16 characters." }, { status: 400 });
    }

    const source = body.sourceType === "url" ? await fetchReadableUrlContent(input) : input;

    const prompt = `You are an execution-focused summarization engine.
Read this content and return only JSON with:
- summary: exactly 5 bullets
- actionPoints: 3 to 7 practical steps
- keyQuestions: 2 to 6 critical follow-up questions
- relatedTags: relevant short tags

Content:\n${source}`;

    const fallback = {
      summary: [
        "Main argument condensed from the provided text.",
        "Secondary idea with context.",
        "Useful insight for execution.",
        "Constraint or caveat to keep in mind.",
        "Overall takeaway.",
      ],
      actionPoints: [
        "Identify one experiment to run this week.",
        "Create a measurable success metric.",
        "Schedule a review checkpoint in 7 days.",
      ],
      keyQuestions: [
        "Which assumption is least certain?",
        "What is the smallest proof of progress?",
      ],
      relatedTags: ["insight", "research"],
    };

    const result = await runGeminiJson({ prompt, schema: summarizeSchema, fallback });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to summarize content.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

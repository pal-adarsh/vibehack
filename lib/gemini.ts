import { z } from "zod";

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type GeminiPart = {
  text?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
};

export const structureIdeaSchema = z.object({
  title: z.string().min(3),
  goal: z.string().min(5),
  summary: z.string().min(8),
  subtasks: z.array(z.string().min(3)).min(3).max(7),
  timeEstimateHours: z.number().min(1).max(200),
  firstStep: z.string().min(5),
  priorityScore: z.number().min(0).max(100),
  confidenceScore: z.number().min(0).max(100),
  tags: z.array(z.string()).max(8),
  dependencies: z.array(z.string()).max(6),
  resourceLinks: z.array(z.string()).max(6),
});

export const summarizeSchema = z.object({
  summary: z.array(z.string()).length(5),
  actionPoints: z.array(z.string()).min(3).max(7),
  keyQuestions: z.array(z.string()).min(2).max(6),
  relatedTags: z.array(z.string()).max(8),
});

export const autopsySchema = z.object({
  diagnosis: z.string().min(10),
  blockers: z.array(z.string()).min(2).max(6),
  revivalPlan: z.array(z.string()).min(3).max(8),
  archiveRecommendation: z.boolean(),
  archiveReason: z.string().optional(),
});

export const weeklyReportSchema = z.object({
  period: z.string().min(3),
  completedIdeas: z.array(z.string()),
  stalledIdeas: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    }),
  ),
  productivityTrend: z.string(),
  focusRecommendations: z.array(z.string()).min(3).max(7),
});

function extractJson(text: string): string {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  return text.trim();
}

async function withRetries<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const delayMs = 1000 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini request failed.");
}

export async function runGeminiJson<T>(args: {
  prompt: string;
  schema: z.ZodType<T>;
  fallback: T;
}): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return args.fallback;
  }

  const data = await withRetries(async () => {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: args.prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini request failed with status ${response.status}.`);
    }

    return (await response.json()) as GeminiResponse;
  });

  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("\n") ?? "";
  const rawJson = extractJson(text);

  const parsed = JSON.parse(rawJson);
  return args.schema.parse(parsed);
}

export async function fetchReadableUrlContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to fetch URL content.");
  }

  const html = await response.text();
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12000);
}

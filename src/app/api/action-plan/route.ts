import { actionPlanContext, planSchema, validateActionPlan, validatePlanRequest } from "@/lib/actionPlan";

export const runtime = "nodejs";
export const maxDuration = 30;
const headers = { "Cache-Control": "no-store" };
const attempts = new Map<string, { at: number; count: number }>();

function reply(body: object, status: number) { return Response.json(body, { status, headers }); }

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.NETCENTRAL_AI_MODEL;
  if (process.env.NETCENTRAL_AI_ENABLED !== "true" || !key || !model) {
    return reply({ error: "The AI planner is unavailable. Your guided roadmap and preparation tools still work." }, 503);
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({ error: "Use the planner from NetCentral." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Choose the planner options and try again." }, 415);
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Choose the planner options first." }, 400);
  let bytes = 0;
  let body = "";
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 2000) { await reader.cancel(); return reply({ error: "The planner request is too large." }, 413); }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  let raw: unknown;
  try { raw = JSON.parse(body); } catch { return reply({ error: "The planner options could not be read." }, 400); }
  const input = validatePlanRequest(raw);
  if (!input || (raw as Record<string, unknown>).consent !== true) return reply({ error: "Choose a valid career, major, year and availability, and confirm data sharing." }, 400);

  // Lightweight abuse protection for a small preview. Provider/project spend limits
  // must also be configured before enabling the feature in production.
  const now = Date.now();
  for (const [id, entry] of attempts) if (now - entry.at > 600_000) attempts.delete(id);
  const id = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const entry = attempts.get(id);
  if ((entry?.count ?? 0) >= 3 || attempts.size >= 1000) return reply({ error: "Please wait a few minutes before creating another AI plan." }, 429);
  attempts.set(id, { at: entry?.at ?? now, count: (entry?.count ?? 0) + 1 });
  const context = actionPlanContext(input);
  try {
    const result = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20_000), cache: "no-store",
      body: JSON.stringify({ model, store: false, max_output_tokens: 1800,
        instructions: "You are NetCentral's career planning assistant for an NCCU undergraduate. Create a realistic four-week exploration and preparation plan using only the supplied career, current year, weekly time, focus and resource catalog. Return weeks1,2,3,4 in that order. Each week has one practical action and an observable deliverable. Respect the weekly time budget. Link only with supplied resource IDs, or none. Do not invent available internships, institutional requirements, event dates, certifications, admissions decisions, experience, research results, employer relationships, salary figures or job guarantees. Distinguish exploration from qualification. Where official requirements are uncertain, ask the student to verify with an advisor. Do not request private identifying data or a resume. Do not include URLs in text fields.",
        input: JSON.stringify(context), text: { format: { type: "json_schema", name: "netcentral_action_plan", strict: true, schema: planSchema(context.resources) } },
      }),
    });
    if (!result.ok) return reply({ error: "The AI service could not create a plan. Your guided roadmap is still available." }, 502);
    const response = await result.json();
    if (response.status !== "completed" || !Array.isArray(response.output)) return reply({ error: "The AI plan was incomplete. Try again later or use your guided priorities." }, 502);
    const text = response.output.flatMap((item: { content?: { type: string; text?: string }[] }) => item.content ?? [])
      .filter((item: { type: string }) => item.type === "output_text").map((item: { text: string }) => item.text).join("");
    const plan = validateActionPlan(JSON.parse(text), context.resources);
    if (!plan) return reply({ error: "The AI plan did not pass its content checks. Use your guided priorities for now." }, 502);
    return reply({ plan, resources: context.resources, generatedBy: "OpenAI", model }, 200);
  } catch { return reply({ error: "The AI planner timed out or returned an unreadable plan. Your guided roadmap still works." }, 502); }
}

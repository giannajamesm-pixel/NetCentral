"use client";

import Link from "next/link";
import { useState } from "react";
import type { ActionPlan, PlanFocus, PlanResource } from "@/lib/actionPlan";
import type { CollegeYear } from "@/lib/studentPath";

export default function AiActionPlan({ careerId, majorId, year }: { careerId: string; majorId: string; year: CollegeYear }) {
  const [hours, setHours] = useState(5);
  const [focus, setFocus] = useState<PlanFocus>("experience");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ plan: ActionPlan; resources: PlanResource[] } | null>(null);
  async function generate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!consent || loading) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/action-plan", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerId, majorId, year, hours, focus, consent }), signal: AbortSignal.timeout(28_000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "The plan could not be created.");
      setResult(data);
    } catch (e) { setError(e instanceof Error ? e.message : "The AI service is unavailable. Use your guided priorities above."); }
    finally { setLoading(false); }
  }
  return <section className="mt-6 border-t border-ink-100 pt-6" aria-labelledby="ai-plan-heading">
    <h3 id="ai-plan-heading" className="font-display text-xl font-bold">Make a four-week action plan</h3>
    <p className="mt-2 text-sm text-ink-500">AI can turn this career&apos;s resources into a plan for your current year and available time.</p>
    <form onSubmit={generate} className="mt-4 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Time each week<select value={hours} onChange={(e) => setHours(Number(e.target.value))} className="review-select mt-2 block min-h-11 w-full rounded-lg border border-ink-100 bg-white p-3"><option value={2}>About 2 hours</option><option value={5}>About 5 hours</option><option value={10}>About 10 hours</option></select></label>
      <label className="text-sm font-semibold">What I want to work on<select value={focus} onChange={(e) => setFocus(e.target.value as PlanFocus)} className="review-select mt-2 block min-h-11 w-full rounded-lg border border-ink-100 bg-white p-3"><option value="experience">Getting experience</option><option value="skills">Building skills</option><option value="applications">Preparing applications</option></select></label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-700 sm:col-span-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary-700" />Send my selected major, career, year, time and focus to OpenAI to create this plan. My resume and checklist are not sent.</label>
      <div className="sm:col-span-2"><button disabled={!consent || loading} className="min-h-11 rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Creating your plan…" : "Generate AI plan"}</button></div>
    </form>
    {error && <p role="alert" className="mt-4 text-sm text-primary-700">{error}</p>}
    <div aria-live="polite" aria-busy={loading}>
      {result && <div className="mt-5"><p className="text-sm leading-relaxed text-ink-700">{result.plan.summary}</p>
        <ol className="mt-4 divide-y divide-ink-100">{result.plan.weeks.map((week) => {
          const resource = result.resources.find((r) => r.id === week.resourceId);
          return <li key={week.week} className="py-4"><p className="review-eyebrow">Week {week.week}</p><h4 className="mt-1 font-semibold">{week.goal}</h4><p className="mt-2 text-sm text-ink-700">{week.action}</p><p className="mt-2 text-sm text-ink-500"><strong>What you&apos;ll have:</strong> {week.evidence}</p>
            {resource && (resource.href.startsWith("/") ? <Link href={resource.href} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:underline">{resource.name} →</Link> : <a href={resource.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:underline">{resource.name} ↗</a>)}</li>;
        })}</ol><p className="mt-3 text-xs text-ink-500">AI-generated guidance can be wrong. Verify requirements and deadlines with the linked source and your advisor.</p></div>}
    </div>
  </section>;
}

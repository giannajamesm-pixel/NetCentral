"use client";

import { useState } from "react";
import ResumePanel from "@/components/bizprep/ResumePanel";
import GuidedDrafts from "@/components/bizprep/GuidedDrafts";

type Tool = "resume" | "cover-letter" | "portfolio";

const TOOLS: { id: Tool; label: string; description: string }[] = [
  { id: "resume", label: "Resume", description: "Review your resume or start a new one" },
  { id: "cover-letter", label: "Cover Letter", description: "Write a letter that gets you noticed" },
  { id: "portfolio", label: "Portfolio", description: "Show off your best work" },
];

export default function BizPrepClient({ careerTitle }: { careerTitle?: string }) {
  const [tool, setTool] = useState<Tool>("resume");
  const current = TOOLS.find((t) => t.id === tool)!;

  return (
    <section
      aria-labelledby="toolkit-heading"
      className="review-panel p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <span aria-hidden className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700">
            02
          </span>
          <div>
            <p className="review-eyebrow">Application preparation</p>
            <h2 id="toolkit-heading" className="font-display mt-1 text-2xl font-bold tracking-tight text-ink-900">
              Application toolkit
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Pick what you&apos;re working on.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="toolkit-choice" className="text-xs font-semibold text-ink-500">Choose a tool</label>
          <select
            id="toolkit-choice"
            value={tool}
            onChange={(event) => setTool(event.target.value as Tool)}
            aria-describedby="toolkit-description"
            className="mt-2 block min-h-11 w-full rounded-xl border border-ink-100 bg-surface px-4 py-3 text-sm font-semibold text-ink-900 focus:outline-2 focus:outline-primary-600"
          >
            {TOOLS.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
          </select>
          <p id="toolkit-description" className="mt-2 text-xs text-ink-500">{current.description}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-ink-100 pt-6">
        <p className="mb-5 text-xs text-ink-500">You can switch tools without losing your work on this page. Copy or download your drafts before leaving or reloading.</p>
        <div hidden={tool !== "resume"}>
          <ResumePanel careerTitle={careerTitle} />
        </div>
        <div hidden={tool !== "cover-letter"}>
          <GuidedDrafts kind="cover-letter" careerTitle={careerTitle} />
        </div>
        <div hidden={tool !== "portfolio"}>
          <GuidedDrafts kind="portfolio" careerTitle={careerTitle} />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import ResumeReview from "@/components/bizprep/ResumeReview";
import { resumeTemplates } from "@/data/bizprep";

type Mode = "upload" | "create";

const MODES: { id: Mode; title: string; description: string; icon: string }[] = [
  {
    id: "upload",
    title: "Upload Current Resume",
    description: "Get a list of edits to make for the position and company you're applying to.",
    icon: "⬆",
  },
  {
    id: "create",
    title: "Create New Resume",
    description: "Start from one of four ready-made templates.",
    icon: "✎",
  },
];

export default function ResumePanel() {
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Resume options">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            className={`flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition ${
              mode === m.id
                ? "border-primary-500 bg-primary-50"
                : "border-ink-100 bg-white hover:border-primary-300"
            }`}
          >
            <span
              aria-hidden
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg ${
                mode === m.id ? "bg-primary-600 text-white" : "bg-surface-soft text-primary-700"
              }`}
            >
              {m.icon}
            </span>
            <span>
              <span className="font-display block text-lg font-bold text-ink-900">{m.title}</span>
              <span className="mt-0.5 block text-sm text-ink-500">{m.description}</span>
            </span>
          </button>
        ))}
      </div>

      {mode === "upload" && (
        <div className="mt-6">
          <ResumeReview />
        </div>
      )}

      {mode === "create" && (
        <div className="mt-6">
          <p className="text-sm text-ink-500">
            Google templates open a &quot;Make a copy&quot; page, so you get your
            own editable version in your Google Drive. The Harvard template
            downloads as a Word file.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {resumeTemplates.map((t) => (
              <li key={t.id}>
                <a
                  href={t.href}
                  {...(t.download
                    ? { download: t.download }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex h-full flex-col rounded-2xl border-2 border-ink-100 bg-white p-5 transition hover:border-primary-300 hover:shadow-md"
                >
                  <span className="self-start rounded-full bg-surface-soft px-2.5 py-1 text-xs font-bold text-ink-500">
                    {t.format}
                  </span>
                  <span className="font-display mt-3 text-lg font-bold text-ink-900">{t.name}</span>
                  <span className="mt-1 flex-1 text-sm text-ink-500">{t.description}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                    {t.download ? "Download template" : "Make my copy"}
                    <span aria-hidden className="transition group-hover:translate-x-1">
                      {t.download ? "↓" : "↗"}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

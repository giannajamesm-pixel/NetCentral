"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Roadmap } from "@/lib/roadmap";
import { CollegeYear, preparationHref, roadmapHref } from "@/lib/studentPath";
import { saveStudentPath, useSavedPath } from "./useSavedPath";
import AiActionPlan from "./AiActionPlan";

type Props = {
  careerId: string; careerTitle: string; majorId: string; majorName: string;
  years: Roadmap["years"]; initialYear?: CollegeYear;
  aiEnabled?: boolean;
};

export default function PathPlanner({ careerId, careerTitle, majorId, majorName, years, initialYear, aiEnabled = false }: Props) {
  const router = useRouter();
  const saved = useSavedPath();
  const matching = saved?.careerId === careerId && saved.majorId === majorId ? saved : null;
  const [changingYear, startYearChange] = useTransition();
  const [changedCompleted, setChangedCompleted] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const year = initialYear ?? matching?.year ?? 1;
  const selected = years.find((entry) => entry.year === year)!;
  const completed = changedCompleted ?? matching?.completed ?? [];
  const priorities = selected.steps.slice(0, 3);
  const prep = preparationHref(majorId, careerId, year);
  const completedCount = priorities.filter((_, i) => completed.includes(`${year}:${i}`)).length;

  function save(nextCompleted = completed, nextYear = year) {
    const ok = saveStudentPath({ version: 1, careerId, careerTitle, majorId, majorName,
      year: nextYear, completed: nextCompleted });
    setMessage(ok ? "Your path and progress are saved on this device." : "This browser could not save your path. You can still download it below.");
  }

  function toggle(id: string) {
    const next = completed.includes(id) ? completed.filter((entry) => entry !== id) : [...completed, id];
    setChangedCompleted(next);
    if (matching) save(next);
  }

  function download() {
    const text = ["NetCentral career plan", `${majorName} / ${careerTitle}`, `Year ${year}: ${selected.theme}`, "",
      ...priorities.map((step, i) => `${completed.includes(`${year}:${i}`) ? "[x]" : "[ ]"} ${step.title}\n${step.detail ?? ""}${step.href ? `\n${step.href.startsWith("/") ? window.location.origin + prep : step.href}` : ""}`),
      "", "Check program requirements and deadlines with your academic advisor.", "Preparation tools: " + window.location.origin + prep].join("\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `NetCentral-${careerId}-year-${year}.txt`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="review-panel mt-8 overflow-hidden" aria-labelledby="next-steps-heading">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink-100 bg-primary-50/50 p-5 sm:p-7">
        <div>
          <p className="review-eyebrow">Your next step</p>
          <h2 id="next-steps-heading" className="font-display mt-2 text-2xl font-bold">Start with where you are now</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-700">Choose your current year. Work through three priorities, then prepare your application.</p>
        </div>
        <label className="text-sm font-semibold text-ink-900">
          My current year
          <select value={year} disabled={changingYear} aria-busy={changingYear} onChange={(e) => {
            const next = Number(e.target.value) as CollegeYear;
            setMessage("");
            startYearChange(() => router.replace(roadmapHref(majorId, careerId, next), { scroll: false }));
          }} className="review-select mt-2 block min-h-11 w-full rounded-lg border border-ink-100 bg-white px-4 py-2 text-sm sm:w-48">
            <option value={1}>Freshman / Year 1</option><option value={2}>Sophomore / Year 2</option>
            <option value={3}>Junior / Year 3</option><option value={4}>Senior / Year 4</option>
          </select>
        </label>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap justify-between gap-2">
          <h3 className="font-display text-lg font-bold">{selected.theme}</h3>
          <p className="text-sm text-ink-500" role="status">{changingYear ? "Updating your priorities…" : `${completedCount} of ${priorities.length} priorities complete`}</p>
        </div>
        <ol className="mt-4 divide-y divide-ink-100">
          {priorities.map((step, i) => {
            const id = `${year}:${i}`;
            return <li key={id} className="flex gap-3 py-4">
              <input id={`priority-${id}`} type="checkbox" checked={completed.includes(id)} onChange={() => toggle(id)} className="mt-1 h-5 w-5 shrink-0 accent-primary-700" />
              <div>
                <label htmlFor={`priority-${id}`} className="block cursor-pointer text-sm font-semibold text-ink-900">{step.title}</label>
                {step.detail && <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.detail}</p>}
                {step.href && (step.href.startsWith("/") ?
                  <Link href={prep} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:underline">Open preparation tools →</Link> :
                  <a href={step.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:underline">Open resource ↗</a>)}
              </div>
            </li>;
          })}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={prep} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600">Prepare my application →</Link>
          <button onClick={() => { save(); router.replace(roadmapHref(majorId, careerId, year), { scroll: false }); }} className="min-h-11 rounded-xl border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">Save my path</button>
          <button onClick={download} className="min-h-11 rounded-xl px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-surface-soft">Download plan</button>
        </div>
        <p className="mt-3 text-xs text-ink-500">Saving keeps your selected path and checklist in this browser. No account or resume upload is needed.</p>
        <p role="status" className="mt-2 text-sm text-primary-700">{message}</p>
        {aiEnabled && <AiActionPlan key={year} careerId={careerId} majorId={majorId} year={year} />}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { outlookLabel } from "@/data/careers";
import { Career } from "@/lib/types";

const ORG_BASE_URL = "https://nccu.presence.io/organization/";

const formatK =(n: number) => `$${Math.round(n / 1000)}k`;

export default function CareerCard({ career }: { career: Career }) {
  const [open, setOpen] = useState(false);
  const { salary, growthPct } = career;
  const panelId = `career-${career.id}`;

  const medianPos = salary
    ? ((salary.median - salary.low) / (salary.high - salary.low)) * 100
    : 0;

  return (
    <div className="rounded-3xl border border-ink-100 bg-surface shadow-sm transition hover:shadow-lg">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <div>
          <h3 className="font-display text-xl font-bold text-ink-900">
            {career.title}
          </h3>
          <p className="mt-1 text-sm text-ink-500">{career.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {salary ? (
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                Median ~{formatK(salary.median)}
              </span>
            ) : (
              <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-bold text-ink-700">
                Pay varies widely
              </span>
            )}
            {growthPct !== undefined && (
              <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-bold text-mint-500">
                {outlookLabel(growthPct)}
              </span>
            )}
          </div>
        </div>
        <span
          aria-hidden
          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink-100 text-ink-500 transition ${
            open ? "rotate-180 bg-primary-50 text-primary-700" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="grid gap-6 border-t border-ink-100 px-6 pb-6 pt-5 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-5">
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Salary range
              </h4>
              {salary ? (
                <>
                  <div className="relative mt-4 h-2 rounded-full bg-primary-100">
                    <span
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary-600 shadow"
                      style={{ left: `${medianPos}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-ink-500">
                    <span>{formatK(salary.low)}</span>
                    <span className="font-semibold text-ink-900">
                      {formatK(salary.median)} median
                    </span>
                    <span>{formatK(salary.high)}</span>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-ink-500">
                  No single reliable figure — income depends heavily on the
                  path you take.
                </p>
              )}
              {growthPct !== undefined && (
                <p className="mt-3 text-sm text-ink-700">
                  Projected job growth:{" "}
                  <span className="font-semibold">
                    {growthPct > 0 ? "+" : ""}
                    {growthPct}%
                  </span>{" "}
                  over 10 years
                </p>
              )}
            </section>

            <section>
              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Who hires
              </h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-ink-700">
                {career.employers.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Skills you&apos;ll use
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {career.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink-100 bg-white px-3 py-1 text-xs font-medium text-ink-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
              Typical trajectory
            </h4>
            <ol className="mt-3 flex flex-col">
              {career.trajectory.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {i < career.trajectory.length - 1 && (
                      <span className="w-px flex-1 bg-primary-100" />
                    )}
                  </div>
                  <span className="pb-4 text-sm font-medium text-ink-900">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <h4 className="mt-2 text-xs font-bold uppercase tracking-wide text-ink-500">
              How to stand out
            </h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-700">
              {career.strategies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            {career.studentOrg && (
              <div className="mt-5 rounded-2xl bg-primary-50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wide text-primary-700">
                  Get involved at NCCU
                </h4>
                <a
                  href={`${ORG_BASE_URL}${career.studentOrg.uri}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-semibold text-primary-700 hover:text-primary-600 hover:underline"
                >
                  {career.studentOrg.name} ↗
                </a>
                <p className="mt-0.5 text-xs text-ink-500">
                  Student organization on Eagle Link
                </p>
              </div>
            )}

            {career.blsUrl && (
              <a
                href={career.blsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
              >
                Source: U.S. Bureau of Labor Statistics ↗
              </a>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

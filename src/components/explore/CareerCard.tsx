"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useState } from "react";
import { outlookDescription, outlookLabel } from "@/data/careers";
import { FORAGE_URL, simulationsFor } from "@/data/simulations";
import { Career } from "@/lib/types";

const ORG_BASE_URL = "https://nccu.presence.io/organization/";

const formatK = (n: number) => `$${Math.round(n / 1000)}k`;

export default function CareerCard({
  career,
  majorId,
}: {
  career: Career;
  majorId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [showAllSims, setShowAllSims] = useState(false);
  const allSims = simulationsFor(career.id);
  const sims = showAllSims ? allSims : allSims.slice(0, 4);
  const { salary, growthPct } = career;
  const panelId = `career-${career.id}`;

  const range =
    salary?.low !== undefined && salary.high !== undefined
      ? { low: salary.low, high: salary.high }
      : null;
  const medianPos =
    salary && range
      ? ((salary.median - range.low) / (range.high - range.low)) * 100
      : 0;

  return (
    <div className={`review-panel transition-colors ${open ? "border-primary-300" : "hover:border-ink-300"}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset sm:p-6"
      >
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
            {career.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{career.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {salary ? (
              <span className="rounded-md bg-primary-50 px-2.5 py-1.5 text-xs font-semibold text-primary-700">
                Median ~{formatK(salary.median)}
              </span>
            ) : (
              <span className="rounded-md bg-surface-soft px-2.5 py-1.5 text-xs font-medium text-ink-700">
                Pay not listed
              </span>
            )}
            {growthPct !== undefined && (
              <span className="group relative inline-flex">
                <span className="cursor-help rounded-md bg-surface-soft px-2.5 py-1.5 text-xs font-medium text-ink-700 underline decoration-dotted decoration-ink-300 underline-offset-2">
                  {outlookLabel(growthPct)}
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-ink-100 bg-surface p-3 text-xs font-normal normal-case text-ink-700 opacity-0 shadow-lg transition group-hover:opacity-100"
                >
                  {outlookDescription(growthPct)}
                </span>
              </span>
            )}
          </div>
        </div>
        <span
          aria-hidden
          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-ink-500 transition-transform ${
            open ? "rotate-180 border-primary-100 bg-primary-50 text-primary-700" : "border-ink-100 bg-surface-soft"
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="grid gap-7 border-t border-ink-100 px-5 pb-5 pt-6 sm:grid-cols-2 sm:px-6 sm:pb-6"
        >
          <div className="flex flex-col gap-5">
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Salary range
              </h4>
              {salary && range ? (
                <>
                  <div className="relative mt-4 h-2 rounded-full bg-primary-100">
                    <span
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary-600 shadow"
                      style={{ left: `${medianPos}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-ink-500">
                    <span>{formatK(range.low)}</span>
                    <span className="font-semibold text-ink-900">
                      {formatK(salary.median)} median
                    </span>
                    <span>{formatK(range.high)}</span>
                  </div>
                </>
              ) : salary ? (
                <p className="mt-2 text-sm text-ink-700">
                  <span className="font-semibold text-ink-900">
                    {formatK(salary.median)} median
                  </span>{" "}
                  (a full pay range isn&apos;t published for this role)
                </p>
              ) : (
                <p className="mt-2 text-sm text-ink-500">
                  Pay figures are not listed for this career. Check current
                  employer postings for role-specific information.
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
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-700">
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
                    className="rounded-md border border-ink-100 bg-surface-soft px-2.5 py-1.5 text-xs font-medium text-ink-700"
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
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary-100 bg-primary-50 text-xs font-bold text-primary-700">
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
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-700">
              {career.strategies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

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

          {(career.studentOrgs?.length || career.resources?.length || sims.length > 0) && (
            <div className="grid gap-4 sm:col-span-2 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
              {career.studentOrgs && career.studentOrgs.length > 0 && (
                <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-primary-700">
                    Get involved at NCCU
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {career.studentOrgs.map((org) => (
                      <li key={org.name}>
                        <a
                          href={org.url ?? `${ORG_BASE_URL}${org.uri}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-primary-700 hover:text-primary-600 hover:underline"
                        >
                          {org.name} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-ink-500">
                    NCCU student organizations (Eagle Link and the School of
                    Business)
                  </p>
                </div>
              )}

              {career.resources && career.resources.length > 0 && (
                <div className="rounded-xl border border-ink-100 bg-surface-soft/50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                    Professional resources
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {career.resources.map((r) => (
                      <li key={r.url}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-ink-900 hover:text-primary-700 hover:underline"
                        >
                          {r.name} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sims.length > 0 && (
                <div className="rounded-xl border border-ink-100 bg-surface-soft/50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                    Try the job
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {sims.map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-ink-900 hover:text-primary-700 hover:underline"
                        >
                          {s.company}: {s.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                  {allSims.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSims(!showAllSims)}
                      className="mt-2 text-sm font-semibold text-primary-700 hover:text-primary-600 hover:underline"
                    >
                      {showAllSims ? "Show fewer" : `Show all ${allSims.length}`}
                    </button>
                  )}
                  <p className="mt-2 text-xs text-ink-500">
                    Free, self-paced{" "}
                    <a
                      href={FORAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-primary-700 hover:underline"
                    >
                      Forage
                    </a>{" "}
                    job simulations. Sign in with your NCCU email.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col items-start gap-4 rounded-xl border border-primary-100 bg-primary-50/40 p-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-bold text-ink-900">Turn this path into a plan</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">
                Classes, projects, certifications, and internships for each
                year of college.
              </p>
            </div>
            <Link
              href={`/explore/${career.id}${majorId ? `?major=${majorId}` : ""}`}
              className="group inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              <Icon name="route" className="h-4 w-4" />
              View 4-year roadmap
              <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

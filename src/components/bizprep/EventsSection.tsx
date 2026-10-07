"use client";

import { useSyncExternalStore } from "react";
import {
  CAREER_CENTER_URL,
  campusEvents,
  fairCompanies,
  HANDSHAKE_URL,
} from "@/data/bizprep";

const noopSubscribe = () => () => {};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function EventsSection() {
  // Filter out past events on the client so a statically built page never
  // shows an event that has already happened. (null while prerendering.)
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-CA"),
    () => null
  );

  const events = campusEvents
    .filter((e) => !e.date || !today || e.date >= today)
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));
  const fairNames = new Map(campusEvents.map((e) => [e.id, e.title]));

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <section
        aria-labelledby="events-heading"
        className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm lg:col-span-3"
      >
        <h2 id="events-heading" className="font-display text-2xl font-bold">
          Campus career events
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Career fairs and professional growth events from NCCU&apos;s Career
          &amp; Professional Development Center. The fall 2026 recruiting
          season runs Aug 26 – Nov 20.
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {events.map((e) => (
            <li
              key={e.id}
              className="rounded-2xl border border-ink-100 bg-surface-soft p-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-700">
                  {e.kind}
                </span>
                <span className="text-ink-500">
                  {e.date ? formatDate(e.date) : e.timing}
                  {e.time && ` · ${e.time}`}
                  {e.location && ` · ${e.location}`}
                </span>
              </div>
              <h3 className="font-display mt-2 text-lg font-bold text-ink-900">
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-700"
                  >
                    {e.title}
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              <p className="mt-1 text-sm text-ink-700">{e.description}</p>
              <p className="mt-2 text-xs font-semibold text-ink-500">
                For: {e.audience}
              </p>
            </li>
          ))}
        </ul>

        <a
          href={HANDSHAKE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          See dates and RSVP in Handshake <span aria-hidden>↗</span>
        </a>
      </section>

      <section
        aria-labelledby="companies-heading"
        className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm lg:col-span-2"
      >
        <h2 id="companies-heading" className="font-display text-2xl font-bold">
          Upcoming career fair companies
        </h2>

        {fairCompanies.length > 0 ? (
          <ul className="mt-5 flex flex-col divide-y divide-ink-100">
            {fairCompanies.map((c) => (
              <li key={`${c.fairId}-${c.name}`} className="py-3 first:pt-0">
                <p className="font-semibold text-ink-900">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-700"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </p>
                <p className="text-xs text-ink-500">
                  {c.industry} · {fairNames.get(c.fairId) ?? "Career fair"}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.hiringFor.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-mint-100 px-2 py-0.5 text-xs font-semibold text-mint-500"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 rounded-2xl border-2 border-dashed border-ink-100 p-5 text-sm text-ink-500">
            <p>
              The employer list for each fair is posted in Handshake. Check back
              here, or see who&apos;s registered now.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={HANDSHAKE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                View employers in Handshake
              </a>
              <a
                href={CAREER_CENTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-ink-100 px-4 py-2 text-center text-sm font-semibold text-ink-700 transition hover:border-primary-300"
              >
                Visit the Career Center
              </a>
            </div>
          </div>
        )}

        <div className="mt-5 rounded-2xl bg-surface-soft p-4 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">Fair-day checklist</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Dress business professional</li>
            <li>Bring 10+ printed copies of your resume</li>
            <li>Research 3–5 target companies ahead of time</li>
            <li>Practice a 30-second intro about yourself</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

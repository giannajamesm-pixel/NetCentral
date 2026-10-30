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
    <div>
      <div className="mb-4 flex items-center gap-3 px-1">
        <span aria-hidden className="font-display flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-sm font-bold text-white">
          01
        </span>
        <p className="review-eyebrow">
          Career connections
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-5">
      <section
        aria-labelledby="events-heading"
        className="review-panel p-6 sm:p-7 lg:col-span-3"
      >
        <h2 id="events-heading" className="font-display text-2xl font-bold tracking-tight text-ink-900">
          Campus career events
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Career fairs and professional growth events from NCCU&apos;s Career
          &amp; Professional Development Center. Check Handshake for current
          dates and registration.
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {events.map((e) => (
            <li
              key={e.id}
              className="rounded-2xl border border-ink-100 border-l-4 border-l-primary-700 bg-surface p-5"
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
              <h3 className="font-display mt-3 text-xl font-bold tracking-tight text-ink-900">
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-primary-700"
                  >
                    {e.title}
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{e.description}</p>
              <p className="mt-4 border-t border-ink-100 pt-3 text-xs font-semibold text-ink-700">
                For: {e.audience}
              </p>
            </li>
          ))}
        </ul>

        <a
          href={HANDSHAKE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600"
        >
          See dates and RSVP in Handshake <span aria-hidden>↗</span>
        </a>
      </section>

      <section
        aria-labelledby="companies-heading"
        className="review-panel p-6 sm:p-7 lg:col-span-2"
      >
        <h2 id="companies-heading" className="font-display text-2xl font-bold tracking-tight text-ink-900">
          Who&apos;s recruiting
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
          <div className="mt-5 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-sm text-ink-700">
            <p className="font-semibold text-ink-900">Start with the current employer list</p>
            <p className="mt-2 leading-relaxed">
              Sign in to NCCU&apos;s Handshake to check participating employers
              for each fair, then research the organizations that interest you.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={HANDSHAKE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-primary-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                View employers in Handshake
              </a>
              <a
                href={CAREER_CENTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-primary-100 bg-surface px-4 py-2.5 text-center text-sm font-semibold text-primary-700 transition hover:border-primary-300"
              >
                Visit the Career Center
              </a>
            </div>
          </div>
        )}

        <div className="mt-5 border-t border-ink-100 pt-5 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">Fair-day checklist</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500 marker:text-primary-700">
            <li>Dress business professional</li>
            <li>Bring 10+ printed copies of your resume</li>
            <li>Research 3–5 target companies ahead of time</li>
            <li>Practice a 30-second intro about yourself</li>
          </ul>
        </div>
      </section>
      </div>
    </div>
  );
}

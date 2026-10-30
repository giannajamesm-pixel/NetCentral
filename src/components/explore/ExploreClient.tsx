"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CareerCard from "@/components/explore/CareerCard";
import { careersForMajor } from "@/data/careers";
import { majors } from "@/data/majors";

export default function ExploreClient({
  initialMajorId,
}: {
  initialMajorId?: string;
}) {
  const [majorId, setMajorId] = useState<string | undefined>(
    majors.some((m) => m.id === initialMajorId) ? initialMajorId : undefined
  );
  const [query, setQuery] = useState("");
  const [careerQuery, setCareerQuery] = useState("");
  const [isChoosingMajor, setIsChoosingMajor] = useState(
    !majors.some((m) => m.id === initialMajorId)
  );
  const careersRef = useRef<HTMLDivElement>(null);
  const careersHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusCareersAfterPick = useRef(false);
  const careerSearchRef = useRef<HTMLInputElement>(null);

  // Deep links (e.g. from quiz results) jump straight to the careers.
  useEffect(() => {
    if (majors.some((m) => m.id === initialMajorId)) {
      careersRef.current?.scrollIntoView({ block: "start" });
    }
  }, [initialMajorId]);

  useEffect(() => {
    if (!focusCareersAfterPick.current || isChoosingMajor) return;
    focusCareersAfterPick.current = false;
    careersHeadingRef.current?.focus({ preventScroll: true });
    careersRef.current?.scrollIntoView({ block: "start" });
  }, [majorId, isChoosingMajor]);

  const selected = majors.find((m) => m.id === majorId);
  const careers = useMemo(
    () => (majorId ? careersForMajor(majorId) : []),
    [majorId]
  );
  const filteredCareers = useMemo(() => {
    const terms = careerQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return careers.filter((career) => {
      const searchable = [career.title, career.summary, ...career.skills].join(" ").toLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [careers, careerQuery]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = majors.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
    const groups = new Map<string, typeof majors>();
    for (const m of filtered) {
      groups.set(m.category, [...(groups.get(m.category) ?? []), m]);
    }
    return [...groups.entries()];
  }, [query]);

  function pick(id: string) {
    focusCareersAfterPick.current = true;
    setMajorId(id);
    setCareerQuery("");
    setQuery("");
    setIsChoosingMajor(false);
    window.history.replaceState(null, "", `/explore?major=${id}`);
  }

  function clearCareerSearch() {
    setCareerQuery("");
    careerSearchRef.current?.focus();
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <span className="review-eyebrow">
          Career Path Explorer
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          See where your major <span className="text-primary-700">can go</span>.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-700">
          Pick a field to explore real careers — what they pay, how fast they
          are growing, the skills they use, and how people move up.
        </p>
      </div>

      {selected && (
        <div className="review-panel mt-8 flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="review-eyebrow">Your selected major</p>
            <p className="font-display mt-1 font-bold text-ink-900">{selected.name}</p>
            <p className="mt-1 text-sm text-ink-500">Choose a career below to see its four-year roadmap.</p>
          </div>
          <button
            type="button"
            aria-expanded={isChoosingMajor}
            aria-controls="major-picker"
            onClick={() => setIsChoosingMajor((open) => !open)}
            className="min-h-11 shrink-0 rounded-lg border border-primary-100 px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {isChoosingMajor ? "Keep this major" : "Change major"}
          </button>
        </div>
      )}

      <div id="major-picker" hidden={!isChoosingMajor} className="review-panel mt-8 p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-ink-900">
            Choose your major
          </h2>
          <span className="text-xs font-medium text-ink-500">
            {majors.length} NCCU majors
          </span>
        </div>
        <label htmlFor="major-search" className="mb-2 block text-sm font-semibold text-ink-700">
          Search majors
        </label>
        <input
          id="major-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search majors (e.g. nursing, business, STEM)"
          className="min-h-12 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />

        <div className="mt-6 flex flex-col gap-5">
          {grouped.length === 0 && (
            <p className="text-sm text-ink-500">No majors match that search.</p>
          )}
          {grouped.map(([category, list]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-500">
                {category}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {list.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => pick(m.id)}
                    aria-pressed={m.id === majorId}
                    className={`min-h-11 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      m.id === majorId
                        ? "border-primary-700 bg-primary-700 text-white"
                        : "border-ink-100 bg-white text-ink-700 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="careers" ref={careersRef} className="mt-10 scroll-mt-24">
        {!selected && (
          <p className="rounded-xl border border-dashed border-ink-100 px-5 py-6 text-center text-sm text-ink-500">
            Choose a major above to see its career paths.
          </p>
        )}

        {selected && (
          <>
            <div className="mb-5 flex flex-col gap-4 border-b border-ink-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="review-eyebrow">
                  {selected.category}
                </span>
                <h2 ref={careersHeadingRef} tabIndex={-1} className="font-display mt-2 text-2xl font-bold tracking-tight text-ink-900 focus:outline-none">
                  Careers for {selected.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">{selected.description}</p>
              </div>
              <span className="inline-flex shrink-0 self-start rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm font-semibold text-ink-700">
                {careers.length} career {careers.length === 1 ? "path" : "paths"}
              </span>
            </div>

            <div className="review-panel mb-5 p-5 sm:p-6">
              <label htmlFor="career-search" className="block text-sm font-semibold text-ink-900">
                Search these careers
              </label>
              <p id="career-search-help" className="mt-1 text-sm text-ink-500">
                Find a role or skill within {selected.name}.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  ref={careerSearchRef}
                  id="career-search"
                  type="search"
                  value={careerQuery}
                  onChange={(e) => setCareerQuery(e.target.value)}
                  aria-describedby="career-search-help career-search-status"
                  placeholder="Search roles or skills, e.g. analyst or Excel"
                  className="min-h-12 min-w-0 flex-1 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                {careerQuery && (
                  <button
                    type="button"
                    onClick={clearCareerSearch}
                    className="min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p id="career-search-status" role="status" className="mt-3 text-xs font-medium text-ink-500">
                Showing {filteredCareers.length} of {careers.length} career {careers.length === 1 ? "path" : "paths"}
                <span className="sr-only"> for {selected.name}</span>.
              </p>
            </div>

            {filteredCareers.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredCareers.map((c) => (
                  <CareerCard key={c.id} career={c} majorId={majorId} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-ink-100 bg-surface p-6 text-center">
                <h3 className="font-display text-lg font-bold text-ink-900">No careers match this search</h3>
                <p className="mt-2 text-sm text-ink-500">
                  Try a different job title or skill, or view all career paths for {selected.name}.
                </p>
                <button
                  type="button"
                  onClick={clearCareerSearch}
                  className="mt-4 min-h-11 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Show all careers
                </button>
              </div>
            )}

            <p className="mt-6 text-xs text-ink-500">
              Pay is the U.S. median with a 10th–90th percentile range, and
              growth is the 2025–35 projection, both from the Bureau of Labor
              Statistics Occupational Outlook Handbook. Figures are national
              and may describe a broader occupation than the career shown.
              Actual pay varies by location, employer, and experience.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

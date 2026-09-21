"use client";

import { useMemo, useState } from "react";
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

  const selected = majors.find((m) => m.id === majorId);
  const careers = useMemo(
    () => (majorId ? careersForMajor(majorId) : []),
    [majorId]
  );

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
    setMajorId(id);
    window.history.replaceState(null, "", `/explore?major=${id}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="text-center">
        <span className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
          Career Path Explorer
        </span>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          See where your major <span className="text-gradient">can go</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          Pick a field to explore real careers — what they pay, how fast they
          are growing, the skills they use, and how people move up.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm">
        <label htmlFor="major-search" className="sr-only">
          Search majors
        </label>
        <input
          id="major-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search majors (e.g. nursing, business, STEM)"
          className="w-full rounded-full border-2 border-ink-100 bg-white px-5 py-3 text-sm outline-none transition focus:border-primary-500"
        />

        <div className="mt-5 flex flex-col gap-4">
          {grouped.length === 0 && (
            <p className="text-sm text-ink-500">No majors match that search.</p>
          )}
          {grouped.map(([category, list]) => (
            <div key={category}>
              <h2 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                {category}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {list.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => pick(m.id)}
                    aria-pressed={m.id === majorId}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
                      m.id === majorId
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-ink-100 bg-white text-ink-700 hover:border-primary-300 hover:bg-primary-50/40"
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

      <div className="mt-10" aria-live="polite">
        {!selected && (
          <p className="text-center text-ink-500">
            Choose a major above to see its career paths.
          </p>
        )}

        {selected && (
          <>
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
                {selected.category}
              </span>
              <h2 className="font-display mt-1 text-2xl font-bold">
                Careers for {selected.name}
              </h2>
              <p className="mt-1 text-ink-500">{selected.description}</p>
            </div>

            <div className="flex flex-col gap-4">
              {careers.map((c) => (
                <CareerCard key={c.id} career={c} />
              ))}
            </div>

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

import Link from "next/link";
import { aidLinksFor, regionNotes } from "@/data/quizContext";
import { MajorMatch, RiasecKey, RiasecScores } from "@/lib/types";

const RIASEC_NAMES: Record<RiasecKey, string> = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

interface ResultsViewProps {
  matches: MajorMatch[];
  riasec: RiasecScores;
  // Selected option ids for the region and household income questions.
  regionId?: string;
  incomeId?: string;
  onRestart: () => void;
}

export default function ResultsView({
  matches,
  riasec,
  regionId,
  incomeId,
  onRestart,
}: ResultsViewProps) {
  const regionNote = regionId ? regionNotes[regionId] : undefined;
  const aidLinks = aidLinksFor(regionId, incomeId);

  const topLetters = (Object.keys(riasec) as RiasecKey[])
    .filter((k) => riasec[k] > 0)
    .sort((a, b) => riasec[b] - riasec[a])
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center">
        <span className="rounded-full bg-mint-100 px-4 py-1.5 text-sm font-semibold text-mint-500">
          Your results are in
        </span>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Here&apos;s what fits{" "}
          <span className="text-gradient">you</span>.
        </h1>
        {topLetters.length > 0 && (
          <p className="mt-4 text-ink-500">
            Your strongest traits:{" "}
            <span className="font-semibold text-ink-900">
              {topLetters.map((l) => RIASEC_NAMES[l]).join(" · ")}
            </span>
          </p>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-5">
        {matches.map((m, i) => {
          return (
          <Link
            key={m.major.id}
            href={`/explore?major=${m.major.id}`}
            className="group block rounded-3xl border border-ink-100 bg-surface p-7 shadow-sm transition hover:border-primary-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
                  Match #{i + 1} · {m.major.category}
                </span>
                <h2 className="font-display mt-1 text-2xl font-bold">
                  {m.major.name}
                </h2>
              </div>
              <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-500">
                {i === 0 ? "Top suggestion" : "Another option"}
              </span>
            </div>

            <p className="mt-3 text-ink-500">{m.major.description}</p>

            <div className="mt-4 rounded-2xl bg-surface-soft p-4 text-sm text-ink-700">
              <span className="font-semibold text-ink-900">Why this fits you: </span>
              {m.reason}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {m.major.careerPaths.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink-100 bg-white px-3 py-1 text-xs font-medium text-ink-700"
                >
                  {c}
                </span>
              ))}
            </div>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
              Explore careers for {m.major.name}
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
          );
        })}
      </div>

      <section className="mt-12 rounded-3xl border border-ink-100 bg-surface p-7 shadow-sm">
        <h2 className="font-display text-2xl font-bold">Next steps for you</h2>

        {regionNote && (
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-primary-600">
              Near home
            </h3>
            <p className="mt-2 text-ink-700">{regionNote}</p>
          </div>
        )}

        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-primary-600">
            Paying for college
          </h3>
          <ul className="mt-3 flex flex-col gap-3">
            {aidLinks.map((link) => (
              <li key={link.url} className="rounded-2xl bg-surface-soft p-4 text-sm">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  {link.name} ↗
                </a>
                <p className="mt-1 text-ink-700">{link.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-ink-500">
          Tap any match to see its careers, salaries, and job outlook in the
          Career Explorer.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border-2 border-ink-900 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-900 hover:text-white"
        >
          Retake the quiz
        </button>
      </div>
    </div>
  );
}

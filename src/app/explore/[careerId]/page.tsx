import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Icon from "@/components/Icon";
import RoadmapRoad, { STEP_STYLES } from "@/components/roadmap/RoadmapRoad";
import { careers, outlookLabel } from "@/data/careers";
import { majors } from "@/data/majors";
import { buildRoadmap } from "@/lib/roadmap";
import { CAREER_CENTER_URL } from "@/data/bizprep";

type Props = {
  params: Promise<{ careerId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { careerId } = await params;
  const career = careers.find((c) => c.id === careerId);
  if (!career) return {};
  return {
    title: `${career.title} Roadmap — NetCentral`,
    description: `A 4-year college roadmap to become a ${career.title}: classes, projects, certifications, and internships.`,
  };
}

const formatK = (n: number) => `$${Math.round(n / 1000)}k`;

export default async function CareerRoadmapPage({ params, searchParams }: Props) {
  const { careerId } = await params;
  const { major: majorParam } = await searchParams;
  const career = careers.find((c) => c.id === careerId);
  if (!career) notFound();

  // Use the major the student came from if this career belongs to it,
  // otherwise the career's primary major.
  const majorId =
    typeof majorParam === "string" && career.majorIds.includes(majorParam)
      ? majorParam
      : career.majorIds[0];
  const major = majors.find((m) => m.id === majorId) ?? majors[0];
  const roadmap = buildRoadmap(career, major);

  return (
    <>
      <Navbar activePage="roadmap" majorId={major.id} careerId={career.id} />
      <main className="bg-campus flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href={`/explore?major=${major.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500 transition hover:text-primary-700"
          >
            ← Back to {major.name} careers
          </Link>

          <header className="mt-7 border-l-4 border-primary-700 pl-5 sm:pl-7">
            <p className="review-eyebrow">{major.name} · Career roadmap</p>
            <h1 className="font-display mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Your road to<br className="hidden sm:block" /> <span className="text-primary-700">{career.title}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-700 sm:text-base">{career.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-100 bg-surface px-3 py-1.5 text-xs font-semibold text-ink-700">
                <Icon name="route" className="h-3.5 w-3.5 text-primary-700" />
                4 years · Your college-to-career guide
              </span>
              {career.salary && (
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                  Median ~{formatK(career.salary.median)}
                </span>
              )}
              {career.growthPct !== undefined && (
                <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-bold text-mint-500">
                  {outlookLabel(career.growthPct)}
                </span>
              )}
              {roadmap.gradSchool && (
                <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-500">
                  Next step: {roadmap.gradSchool.school}
                </span>
              )}
            </div>
          </header>

          <nav aria-label="Jump to a roadmap year" className="review-panel mt-8 grid grid-cols-2 overflow-hidden sm:grid-cols-4">
            {roadmap.years.map((year) => (
              <a
                key={year.year}
                href={`#year-${year.year}`}
                className="group flex items-center gap-3 border-ink-100 px-4 py-4 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:border-r sm:last:border-r-0"
              >
                <span className="font-display text-2xl font-bold text-primary-300 group-hover:text-primary-700">0{year.year}</span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-ink-500">Year {year.year}</span>
                  <span className="mt-0.5 block text-xs font-semibold text-ink-900">{year.label.replace(" year", "")}</span>
                </span>
              </a>
            ))}
          </nav>

          <ul
            aria-label="Legend"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
          >
            {Object.values(STEP_STYLES).map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-1.5 text-[11px] font-medium text-ink-500"
              >
                <Icon name={s.icon} className="h-3.5 w-3.5 text-primary-700" />
                {s.label}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-ink-100 pt-8">
            <RoadmapRoad roadmap={roadmap} careerTitle={career.title} />
          </div>

          {career.trajectory.length > 1 && (
            <section className="review-panel mx-auto mt-12 max-w-3xl p-6 text-center">
              <p className="review-eyebrow">Beyond graduation</p>
              <h2 className="font-display mt-2 text-xl font-bold">Where your career can lead</h2>
              <ol className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                {career.trajectory.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-ink-100 bg-surface px-3 py-1 font-semibold text-ink-900">
                      {step}
                    </span>
                    {i < career.trajectory.length - 1 && (
                      <span aria-hidden className="text-ink-300">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="review-panel mt-10 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="review-eyebrow">Put your plan into action</p>
              <h2 className="font-display mt-2 text-xl font-bold text-ink-900">Prepare for your next opportunity</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">Take your {career.title} plan into BizPrep for resume tools, recruiting resources, and practical experience.</p>
            </div>
            <Link
              href={`/bizprep?major=${encodeURIComponent(major.id)}&career=${encodeURIComponent(career.id)}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Continue to BizPrep →
            </Link>
          </section>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-ink-500">
            This roadmap is a general guide built from this career&apos;s
            requirements and common paths. Course sequences and program
            deadlines vary, so check your plan with your NCCU academic advisor
            and the{" "}
            <a
              href={CAREER_CENTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 hover:underline"
            >
              Career &amp; Professional Development Center
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}

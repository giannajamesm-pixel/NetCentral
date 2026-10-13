import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      <main className="bg-mesh flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <Link
            href={`/explore?major=${major.id}`}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            ← Back to {major.name} careers
          </Link>

          <header className="mt-6 text-center">
            <span className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              4-year roadmap · {major.name}
            </span>
            <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Your road to <span className="text-gradient">{career.title}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-ink-500">{career.summary}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
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
                  Requires {roadmap.gradSchool.school}
                </span>
              )}
            </div>
          </header>

          <ul
            aria-label="Legend"
            className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {Object.values(STEP_STYLES).map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-1.5 rounded-full border border-ink-100 bg-surface px-3 py-1 text-xs font-semibold text-ink-700"
              >
                <span aria-hidden>{s.icon}</span>
                {s.label}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <RoadmapRoad roadmap={roadmap} careerTitle={career.title} />
          </div>

          {career.trajectory.length > 1 && (
            <section className="mx-auto mt-12 max-w-3xl text-center">
              <h2 className="font-display text-xl font-bold">Keep driving: where it can lead</h2>
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

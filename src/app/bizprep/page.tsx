import Link from "next/link";
import Navbar from "@/components/Navbar";
import BizPrepClient from "@/components/bizprep/BizPrepClient";
import EventsSection from "@/components/bizprep/EventsSection";
import { careers } from "@/data/careers";
import { majors } from "@/data/majors";

export const metadata = {
  title: "BizPrep — NetCentral",
  description:
    "Campus career resources, Handshake fair information, and resume tools for NCCU students.",
};

export default async function BizPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { career: careerParam, major: majorParam } = await searchParams;
  const career = typeof careerParam === "string" ? careers.find((c) => c.id === careerParam) : undefined;
  const majorId = career
    ? typeof majorParam === "string" && career.majorIds.includes(majorParam)
      ? majorParam
      : career.majorIds[0]
    : undefined;
  const major = majors.find((m) => m.id === majorId);

  return (
    <>
      <Navbar activePage="bizprep" majorId={major?.id} careerId={career?.id} />
      <main className="bg-campus flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <header className="review-panel overflow-hidden">
            <div className="h-1.5 bg-primary-700" />
            <div className="grid gap-6 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="review-eyebrow">
                  BizPrep / NCCU career preparation
                </p>
                <h1 className="font-display mt-3 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                  Get <span className="text-primary-700">career ready.</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
                  Find campus recruiting resources, prepare your application,
                  and explore the work you could do next.
                </p>
              </div>
              <p className="border-l-2 border-primary-100 pl-4 text-sm leading-relaxed text-ink-500 lg:max-w-48">
                Your next opportunity starts with a little preparation.
              </p>
            </div>
          </header>

          <div className="mt-8 flex flex-col gap-8">
            {career && major && (
              <section className="review-panel flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6" aria-label="Your career plan">
                <div>
                  <p className="review-eyebrow">Your next step</p>
                  <h2 className="font-display mt-1 text-lg font-bold text-ink-900">Preparing for {career.title}</h2>
                  <p className="mt-1 text-sm text-ink-500">Use these resources alongside your {major.name} roadmap.</p>
                </div>
                <Link
                  href={`/explore/${career.id}?major=${major.id}`}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  ← Return to your roadmap
                </Link>
              </section>
            )}
            <EventsSection />
            <BizPrepClient />

            <section
              aria-labelledby="forage-heading"
              className="review-panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span aria-hidden className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700">
                  03
                </span>
                <div>
                  <p className="review-eyebrow">Practical experience</p>
                  <h2 id="forage-heading" className="font-display mt-1 text-2xl font-bold tracking-tight text-ink-900">
                    Explore careers with Forage
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
                    Explore career preparation resources and virtual job simulations on Forage.
                  </p>
                </div>
              </div>
              <a
                href="https://www.theforage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                Visit Forage
                <span aria-hidden>↗</span>
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

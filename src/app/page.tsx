import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContinuePath from "@/components/path/ContinuePath";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="bg-mesh relative flex flex-1 items-center overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
            <span className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              Built by NCCU students, for NCCU students
            </span>
            <h1 className="font-display mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
              Choose a career.<br /> Know your <span className="text-gradient">next step</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-500">
              Explore NCCU majors, find a career that interests you, and build
              a plan for your current year with campus resources close at hand.
            </p>
            <ContinuePath />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quiz"
                className="rounded-full bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-300/40 transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                Help me explore majors →
              </Link>
              <Link
                href="/explore"
                className="rounded-full border-2 border-ink-900 px-7 py-3.5 text-base font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:bg-ink-900 hover:text-white"
              >
                I already have a major
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="bg-mesh relative flex flex-1 items-center overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
            <span className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
              Built for students who want a real answer, not a personality meme
            </span>
            <h1 className="font-display mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
              Find the path that actually{" "}
              <span className="text-gradient">fits you</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-500">
              NetCentral turns who you are — your interests, strengths, values,
              and work style — into majors and careers worth exploring. Plus
              real alumni to talk to along the way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quiz"
                className="rounded-full bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-300/40 transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                I don&apos;t know my major yet →
              </Link>
              <Link
                href="/explore"
                className="rounded-full border-2 border-ink-900 px-7 py-3.5 text-base font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:bg-ink-900 hover:text-white"
              >
                I know my field, show me careers
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

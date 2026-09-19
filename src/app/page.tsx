import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  {
    tag: "Discovery",
    color: "bg-primary-100 text-primary-700",
    title: "Major & Career Quiz",
    body: "Not sure what to study? A short, honest quiz maps your personality, interests, and values to majors that actually fit.",
  },
  {
    tag: "Direction",
    color: "bg-coral-100 text-coral-500",
    title: "Career Path Explorer",
    body: "Already know your field? See real trajectories, salary ranges, required skills, and where the job market is heading.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-mesh relative overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 pb-24 text-center">
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

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to choose with confidence
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${f.color}`}
                >
                  {f.tag}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-ink-900 px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Takes 4 minutes. Zero judgment.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-300">
              Answer a few honest questions and get 3–5 majors matched to who
              you actually are — not who you think you should be.
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:bg-mint-400"
            >
              Start the quiz
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

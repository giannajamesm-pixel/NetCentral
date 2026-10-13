import Link from "next/link";
import { Roadmap, RoadmapStep, StepType } from "@/lib/roadmap";

export const STEP_STYLES: Record<StepType, { icon: string; label: string; badge: string }> = {
  class: { icon: "📚", label: "Class / skill", badge: "bg-mint-100 text-mint-500" },
  project: { icon: "🛠️", label: "Project", badge: "bg-coral-100 text-coral-500" },
  cert: { icon: "🏅", label: "Certification / exam", badge: "bg-primary-50 text-primary-700" },
  experience: { icon: "💼", label: "Experience", badge: "bg-sun-100 text-sun-500" },
  org: { icon: "🤝", label: "Get involved", badge: "bg-ink-100 text-ink-700" },
  milestone: { icon: "🎯", label: "Milestone", badge: "bg-primary-600 text-white" },
};

function StepLink({ step }: { step: RoadmapStep }) {
  if (!step.href) return null;
  const internal = step.href.startsWith("/");
  const className =
    "mt-1 inline-flex text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline";
  return internal ? (
    <Link href={step.href} className={className}>
      Open in NetCentral →
    </Link>
  ) : (
    <a href={step.href} target="_blank" rel="noopener noreferrer" className={className}>
      Learn more ↗
    </a>
  );
}

export default function RoadmapRoad({
  roadmap,
  careerTitle,
}: {
  roadmap: Roadmap;
  careerTitle: string;
}) {
  return (
    <div className="relative">
      {/* The road: asphalt strip with a dashed center line. Left edge on
          phones, centered on wider screens. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-4 w-10 rounded-full bg-ink-900 shadow-inner md:left-1/2 md:-translate-x-1/2"
      >
        <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-l-4 border-dashed border-white/80" />
      </div>

      {/* Start sign */}
      <div className="relative flex justify-start pl-1 md:justify-center md:pl-0">
        <span className="rounded-full border-4 border-surface bg-primary-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md">
          Start · First day at NCCU
        </span>
      </div>

      <ol className="relative mt-8 flex flex-col gap-10">
        {roadmap.years.map((y, i) => {
          const right = i % 2 === 1;
          return (
            <li key={y.year} className="relative">
              {/* Mile marker on the road */}
              <span
                aria-hidden
                className="absolute top-5 left-4 z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-surface bg-primary-600 font-display text-sm font-bold text-white shadow md:left-1/2 md:-translate-x-1/2"
              >
                {y.year}
              </span>
              {/* Exit ramp from the road to the signpost card */}
              <span
                aria-hidden
                className={`absolute top-9 hidden h-1 w-10 bg-ink-300 md:block ${
                  right ? "left-1/2 ml-5" : "right-1/2 mr-5"
                }`}
              />

              <section
                aria-label={`Year ${y.year}: ${y.label}`}
                className={`ml-20 rounded-3xl border border-ink-100 bg-surface p-5 shadow-sm md:ml-0 md:w-[calc(50%-3.75rem)] ${
                  right ? "md:ml-auto" : ""
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-primary-600">
                  Year {y.year} · {y.label}
                </p>
                <h3 className="font-display mt-1 text-xl font-bold text-ink-900">{y.theme}</h3>

                <ul className="mt-4 flex flex-col gap-3">
                  {y.steps.map((step) => {
                    const s = STEP_STYLES[step.type];
                    return (
                      <li key={`${step.type}-${step.title}`} className="flex gap-3">
                        <span
                          aria-hidden
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm ${s.badge}`}
                        >
                          {s.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
                            {s.label}
                          </p>
                          <p className="text-sm font-semibold text-ink-900">{step.title}</p>
                          {step.detail && (
                            <p className="mt-0.5 text-sm text-ink-700">{step.detail}</p>
                          )}
                          <StepLink step={step} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </li>
          );
        })}
      </ol>

      {/* Destination */}
      <div className="relative mt-10 flex justify-start md:justify-center">
        <div className="ml-20 w-full max-w-md rounded-3xl border-2 border-primary-500 bg-surface p-6 text-center shadow-lg md:ml-0">
          <p aria-hidden className="text-3xl">🏁</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary-600">
            Destination
          </p>
          <h3 className="font-display mt-1 text-2xl font-bold text-ink-900">{careerTitle}</h3>
          <p className="mt-2 text-sm text-ink-700">
            {roadmap.afterGraduation ?? (
              <>
                Your first role after graduation:{" "}
                <span className="font-semibold text-ink-900">{roadmap.firstJob}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import { Roadmap, RoadmapStep, StepType } from "@/lib/roadmap";

// One quiet neutral style for every step type; milestones are filled in
// maroon so the big moments stand out along the road.
const NEUTRAL = "border border-ink-100 bg-surface text-primary-700";
export const STEP_STYLES: Record<StepType, { icon: IconName; label: string; badge: string }> = {
  class: { icon: "book", label: "Class / skill", badge: NEUTRAL },
  project: { icon: "tool", label: "Project", badge: NEUTRAL },
  cert: { icon: "award", label: "Certification / exam", badge: NEUTRAL },
  experience: { icon: "briefcase", label: "Experience", badge: NEUTRAL },
  org: { icon: "users", label: "Get involved", badge: NEUTRAL },
  milestone: { icon: "flag", label: "Milestone", badge: "bg-primary-600 text-white" },
};

function StepLink({ step }: { step: RoadmapStep }) {
  if (!step.href) return null;
  const internal = step.href.startsWith("/");
  const className =
    "mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700";
  return internal ? (
    <Link href={step.href} className={className}>
      Open in NetCentral <Icon name="arrowRight" className="h-3 w-3" />
    </Link>
  ) : (
    <a href={step.href} target="_blank" rel="noopener noreferrer" className={className}>
      Learn more <Icon name="arrowUpRight" className="h-3 w-3" />
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
      {/* A quiet path connects the year markers without competing with the plan. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-5 w-px bg-primary-100 md:left-1/2"
      />

      {/* Start sign */}
      <div className="relative flex justify-start md:justify-center">
        <span className="rounded-lg bg-primary-700 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white">
          Start · First day at NCCU
        </span>
      </div>

      <ol className="relative mt-8 flex flex-col gap-10">
        {roadmap.years.map((y, i) => {
          const right = i % 2 === 1;
          return (
            <li key={y.year} id={`year-${y.year}`} className="relative scroll-mt-28">
              {/* Mile marker on the road */}
              <span
                aria-hidden
                className="absolute top-5 left-0 z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-background bg-primary-700 font-display text-sm font-bold text-white md:left-1/2 md:-translate-x-1/2"
              >
                {y.year}
              </span>
              {/* Exit ramp from the road to the signpost card */}
              <span
                aria-hidden
                className={`absolute top-10 hidden h-px w-10 bg-primary-100 md:block ${
                  right ? "left-1/2 ml-5" : "right-1/2 mr-5"
                }`}
              />

              <section
                aria-label={`Year ${y.year}: ${y.label}`}
                className={`review-panel ml-14 p-5 sm:p-6 md:ml-0 md:w-[calc(50%-3.75rem)] ${
                  right ? "md:ml-auto" : ""
                }`}
              >
                <p className="review-eyebrow">
                  Year {y.year} · {y.label}
                </p>
                <h2 className="font-display mt-2 text-xl font-bold leading-snug text-ink-900">{y.theme}</h2>

                <ul className="mt-5 flex flex-col divide-y divide-ink-100">
                  {y.steps.map((step) => {
                    const s = STEP_STYLES[step.type];
                    return (
                      <li key={`${step.type}-${step.title}`} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <span
                          aria-hidden
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${s.badge}`}
                        >
                          <Icon name={s.icon} className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
                            {s.label}
                          </p>
                          <p className="text-sm font-semibold text-ink-900">{step.title}</p>
                          {step.detail && (
                            <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.detail}</p>
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
        <div className="review-panel ml-14 w-full max-w-md border-t-4 border-t-primary-700 p-6 text-center md:ml-0">
          <span
            aria-hidden
            className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-primary-600 text-white"
          >
            <Icon name="pin" className="h-5 w-5" />
          </span>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-primary-600">
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

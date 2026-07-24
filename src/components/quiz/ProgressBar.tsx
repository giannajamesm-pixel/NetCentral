interface ProgressBarProps {
  current: number;
  total: number;
  sectionLabel: string;
}

export default function ProgressBar({ current, total, sectionLabel }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-medium text-ink-500">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
          {sectionLabel}
        </span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-coral-500 to-sun-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

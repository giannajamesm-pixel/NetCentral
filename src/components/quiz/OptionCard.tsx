interface OptionCardProps {
  label: string;
  selected: boolean;
  multi: boolean;
  onClick: () => void;
}

export default function OptionCard({ label, selected, multi, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${
        selected
          ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
          : "border-ink-100 bg-surface text-ink-700 hover:border-primary-300 hover:bg-primary-50/40"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center border-2 ${
          multi ? "rounded-md" : "rounded-full"
        } ${
          selected
            ? "border-primary-500 bg-primary-500"
            : "border-ink-300 bg-white"
        }`}
      >
        {selected && (
          <span className={`h-2 w-2 bg-white ${multi ? "rounded-sm" : "rounded-full"}`} />
        )}
      </span>
      {label}
    </button>
  );
}

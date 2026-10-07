"use client";

import { useEffect, useRef, useState } from "react";
import ResumePanel from "@/components/bizprep/ResumePanel";

type Tool = "resume" | "cover-letter" | "portfolio";

const TOOLS: { id: Tool; label: string; description: string }[] = [
  { id: "resume", label: "Resume", description: "Review your resume or start a new one" },
  { id: "cover-letter", label: "Cover Letter", description: "Write a letter that gets you noticed" },
  { id: "portfolio", label: "Portfolio", description: "Show off your best work" },
];

export default function BizPrepClient() {
  const [tool, setTool] = useState<Tool>("resume");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = TOOLS.find((t) => t.id === tool)!;

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(id: Tool) {
    setTool(id);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <section
      aria-labelledby="toolkit-heading"
      className="rounded-3xl border border-ink-100 bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="toolkit-heading" className="font-display text-2xl font-bold">
            Application toolkit
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Pick what you&apos;re working on.
          </p>
        </div>

        <div ref={menuRef} className="relative w-full sm:w-72">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls="toolkit-menu"
            className="flex w-full items-center justify-between gap-3 rounded-full border-2 border-ink-900 bg-white px-5 py-3 text-left text-sm font-semibold text-ink-900 transition hover:bg-surface-soft"
          >
            {current.label}
            <span
              aria-hidden
              className={`text-ink-500 transition ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          {open && (
            <ul
              id="toolkit-menu"
              role="listbox"
              aria-label="Toolkit sections"
              className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-ink-100 bg-surface p-1.5 shadow-lg"
            >
              {TOOLS.map((t) => (
                <li key={t.id} role="option" aria-selected={t.id === tool}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    className={`w-full rounded-xl px-4 py-2.5 text-left transition ${
                      t.id === tool ? "bg-primary-50" : "hover:bg-surface-soft"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        t.id === tool ? "text-primary-700" : "text-ink-900"
                      }`}
                    >
                      {t.label}
                    </span>
                    <span className="block text-xs text-ink-500">{t.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-ink-100 pt-6">
        {tool === "resume" ? (
          <ResumePanel />
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-ink-100 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink-900">
              {current.label} tools are coming soon
            </p>
            <p className="mt-1 text-sm text-ink-500">{current.description}. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}

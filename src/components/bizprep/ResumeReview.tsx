"use client";

import { useRef, useState } from "react";
import {
  ACCEPTED_TYPES,
  extractResumeText,
  ReviewItem,
  ReviewResult,
  reviewResume,
} from "@/lib/resumeReview";

const STATUS_STYLES: Record<ReviewItem["status"], { label: string; icon: string; badge: string }> = {
  fix: { label: "Fix", icon: "!", badge: "bg-primary-600 text-white" },
  tip: { label: "Tip", icon: "i", badge: "bg-coral-500 text-white" },
  good: { label: "Looks good", icon: "✓", badge: "bg-mint-100 text-mint-500" },
};

const inputClass =
  "w-full rounded-2xl border-2 border-ink-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-500";

export default function ResumeReview() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [pasteMode, setPasteMode] = useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const extracted = (await extractResumeText(file)).trim();
      if (!extracted) {
        throw new Error(
          "We couldn't find any text in that file. It may be a scanned image. Try a .docx, or paste your resume text instead."
        );
      }
      setText(extracted);
      setFileName(file.name);
    } catch (e) {
      setText("");
      setFileName(null);
      setError(e instanceof Error ? e.message : "Something went wrong reading that file.");
    } finally {
      setLoading(false);
    }
  }

  const canReview = text.trim().length > 0 && position.trim() && company.trim();

  function runReview(e: React.FormEvent) {
    e.preventDefault();
    if (!canReview) return;
    setResult(reviewResume({ text, position, company, jobDescription }));
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }

  return (
    <div>
      <form onSubmit={runReview} className="flex flex-col gap-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-ink-900">Your resume</span>
            <button
              type="button"
              onClick={() => {
                setPasteMode((p) => !p);
                setError(null);
              }}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              {pasteMode ? "Upload a file instead" : "Paste text instead"}
            </button>
          </div>

          {pasteMode ? (
            <textarea
              aria-label="Resume text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setFileName(null);
                setResult(null);
              }}
              rows={8}
              placeholder="Paste the full text of your resume here"
              className={`${inputClass} mt-2`}
            />
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`mt-2 flex flex-col items-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
                dragging ? "border-primary-500 bg-primary-50" : "border-ink-100 bg-surface-soft"
              }`}
            >
              <input
                ref={fileInput}
                type="file"
                accept={ACCEPTED_TYPES}
                className="sr-only"
                id="resume-file"
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              {loading ? (
                <p className="text-sm text-ink-500">Reading your resume…</p>
              ) : fileName ? (
                <>
                  <p className="text-sm font-semibold text-ink-900">📄 {fileName}</p>
                  <p className="mt-1 text-xs text-ink-500">
                    {text.split(/\s+/).filter(Boolean).length} words read
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-ink-900">
                    Drag your resume here
                  </p>
                  <p className="mt-1 text-xs text-ink-500">PDF, Word (.docx), or .txt</p>
                </>
              )}
              <label
                htmlFor="resume-file"
                className="mt-3 cursor-pointer rounded-full border-2 border-ink-900 px-4 py-1.5 text-sm font-semibold text-ink-900 transition hover:bg-ink-900 hover:text-white"
              >
                {fileName ? "Choose a different file" : "Choose file"}
              </label>
            </div>
          )}
          {error && (
            <p role="alert" className="mt-2 text-sm font-medium text-primary-700">
              {error}
            </p>
          )}
          <p className="mt-2 text-xs text-ink-500">
            🔒 Your resume is read right in your browser. It&apos;s never uploaded or stored.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-900">
            Position you&apos;re applying for
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Marketing Intern"
              required
              className={`${inputClass} font-normal`}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-900">
            Company
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Fidelity Investments"
              required
              className={`${inputClass} font-normal`}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-900">
          <span>
            Job description <span className="font-normal text-ink-500">(optional, but recommended)</span>
          </span>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste the job posting to check which keywords your resume is missing"
            className={`${inputClass} font-normal`}
          />
        </label>

        <button
          type="submit"
          disabled={!canReview}
          className="self-start rounded-full bg-primary-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary-300/40 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none"
        >
          Review my resume
        </button>
      </form>

      {result && (
        <div ref={resultsRef} className="mt-8 scroll-mt-24 border-t border-ink-100 pt-8" aria-live="polite">
          <div className="flex flex-wrap items-center gap-5">
            <div
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-primary-600) ${result.score * 3.6}deg, var(--color-ink-100) 0deg)`,
              }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
                <span className="font-display text-xl font-bold">{result.score}</span>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">
                Your review for {position} at {company}
              </h3>
              <p className="text-sm text-ink-500">
                {result.items.filter((i) => i.status === "fix").length} edits to make ·{" "}
                {result.items.filter((i) => i.status === "good").length} things you&apos;re doing well
              </p>
            </div>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {result.items.map((item) => {
              const s = STATUS_STYLES[item.status];
              return (
                <li key={item.id} className="flex gap-3 rounded-2xl border border-ink-100 bg-surface p-4">
                  <span
                    aria-label={s.label}
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${s.badge}`}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-700">{item.detail}</p>
                    {item.id === "keywords" && (result.keywordsMissing.length > 0 || result.keywordsFound.length > 0) && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {result.keywordsMissing.map((k) => (
                          <span key={k} className="rounded-full border border-primary-300 bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                            + {k}
                          </span>
                        ))}
                        {result.keywordsFound.map((k) => (
                          <span key={k} className="rounded-full bg-mint-100 px-2.5 py-0.5 text-xs font-semibold text-mint-500">
                            ✓ {k}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs text-ink-500">
            This is an automated checklist, not a human review. For one-on-one
            feedback, book a resume review with NCCU&apos;s Career &amp;
            Professional Development Center in Handshake.
          </p>
        </div>
      )}
    </div>
  );
}

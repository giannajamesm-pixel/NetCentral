"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import OptionCard from "@/components/quiz/OptionCard";
import ProgressBar from "@/components/quiz/ProgressBar";
import ResultsView from "@/components/quiz/ResultsView";
import { quizQuestions } from "@/data/quiz";
import { matchMajors, QuizAnswers, scoreAnswers } from "@/lib/matching";

// Persist results for the browser session so "Back" from the Career Explorer
// returns to the student's matches instead of a blank quiz.
const STORAGE_KEY = "netcentral-quiz";

export default function QuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { answers: QuizAnswers };
        setAnswers(parsed.answers);
        setSubmitted(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (submitted) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers }));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }, [submitted, answers]);

  const question = quizQuestions[stepIndex];
  const isLast = stepIndex === quizQuestions.length - 1;
  const selected = answers[question?.id] ?? [];

  const scores = useMemo(() => scoreAnswers(answers), [answers]);
  const matches = useMemo(() => matchMajors(scores, undefined, 4), [scores]);

  function toggleOption(optionId: string) {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];

      if (question.type === "single") {
        return { ...prev, [question.id]: [optionId] };
      }

      const isSelected = current.includes(optionId);
      if (isSelected) {
        return { ...prev, [question.id]: current.filter((id) => id !== optionId) };
      }

      const max = question.maxSelect ?? question.options.length;
      if (current.length >= max) return prev;

      return { ...prev, [question.id]: [...current, optionId] };
    });
  }

  function goNext() {
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, quizQuestions.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="bg-mesh flex-1">
          <ResultsView matches={matches} riasec={scores.riasec} onRestart={restart} />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-mesh flex-1">
        <div className="mx-auto max-w-2xl px-6 py-14">
          <ProgressBar
            current={stepIndex + 1}
            total={quizQuestions.length}
            sectionLabel={question.section}
          />

          <div className="mt-10">
            <h1 className="font-display text-2xl font-bold leading-snug text-ink-900 sm:text-3xl">
              {question.prompt}
            </h1>
            {question.helper && (
              <p className="mt-2 text-sm text-ink-500">{question.helper}</p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {question.options.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={selected.includes(option.id)}
                multi={question.type === "multi"}
                onClick={() => toggleOption(option.id)}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-500 transition hover:bg-ink-100 disabled:opacity-0"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={selected.length === 0}
              className="rounded-full bg-primary-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary-300/40 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none"
            >
              {isLast ? "See My Results" : "Next"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

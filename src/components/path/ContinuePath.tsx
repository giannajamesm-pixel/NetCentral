"use client";

import Link from "next/link";
import { roadmapHref } from "@/lib/studentPath";
import { useSavedPath } from "./useSavedPath";

export default function ContinuePath() {
  const path = useSavedPath();
  if (!path) return null;
  return (
    <aside className="mt-8 w-full max-w-xl rounded-2xl border border-primary-100 bg-white p-5 text-left shadow-sm">
      <p className="review-eyebrow">Your saved path</p>
      <p className="font-display mt-2 text-lg font-bold text-ink-900">{path.careerTitle}</p>
      <p className="mt-1 text-sm text-ink-500">{path.majorName} · Year {path.year}</p>
      <Link href={roadmapHref(path.majorId, path.careerId, path.year)} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:underline">
        Continue where you left off →
      </Link>
    </aside>
  );
}

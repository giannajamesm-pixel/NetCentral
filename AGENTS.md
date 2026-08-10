<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project runs Next.js 16, which has breaking changes vs. your training data — APIs, conventions, and file structure may differ. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js-specific code (routing, config, data fetching). Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NetCentral

NetCentral is a web app for North Carolina Central University students: a short quiz maps a student's personality, interests, and values to real NCCU undergraduate majors and career paths. Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. No backend/database — all quiz and major data lives in static TypeScript files and scoring runs client-side.

## Where things live

- `src/app/page.tsx` — marketing home page.
- `src/app/quiz/page.tsx` — the quiz flow itself (client component): steps through `quizQuestions`, collects answers, then renders `ResultsView`.
- `src/components/quiz/` — `OptionCard` (answer choice button), `ProgressBar`, `ResultsView` (ranked major matches).
- `src/components/Navbar.tsx` — site header/nav.
- `src/data/quiz.ts` — the question bank (`quizQuestions`).
- `src/data/majors.ts` — the major catalog (`majors`), sourced from nccu.edu/academics/undergraduate-programs.
- `src/lib/types.ts` — shared types for the data model below.
- `src/lib/matching.ts` — scoring and matching logic (`scoreAnswers`, `matchMajors`).

The Navbar and home page already link to `/explore` (Career Path Explorer) and `/alumni` (Alumni Connect) — **these routes don't exist yet**. Only `/` and `/quiz` are built. Don't assume those pages exist.

## Data model & scoring (read before editing quiz.ts, majors.ts, or matching.ts)

This app uses a RIASEC-style personality model (`RiasecKey`: `R I A S E C`, defined in `src/lib/types.ts`), plus `ValueTag` and `InterestTag` enums.

- Each `QuizQuestion` has `options`, and each `QuizOption` can carry `weights` (partial RIASEC scores, e.g. `{ R: 2 }`), `valueTags`, and `interestTags`. A question's `weightMultiplier` (default 1) scales every point it awards.
- `scoreAnswers` (in `matching.ts`) sums the selected options' weights/tags into a `QuizScores` (RIASEC totals + value/interest counts).
- `matchMajors` ranks `Major` entries by: `major.riasec · scores.riasec` (dot product) plus bonus points for overlapping top value tags (top 3, +6 each) and top interest tags (top 4, +4 each). It also builds the human-readable "why this fits you" reason string.
- `Major.riasec` values are typically small integers (0–3) reflecting how strongly that major maps to each trait — keep new majors consistent with the existing scale in `majors.ts` rather than inventing a new range.
- Personality-section questions intentionally rotate which single trait each option maps to (one option per RIASEC letter), so every trait gets picked up evenly across the quiz. Preserve that balance when adding/editing "Personality" questions.

When adding a major or question, follow the existing shape exactly (see `majors.ts`/`quiz.ts` for examples) — the UI and scoring assume every option/major is fully populated.

## Design system

Brand colors are NCCU's official palette, defined as CSS variables in `src/app/globals.css` and exposed as Tailwind tokens via `@theme inline`:

- `primary-*` — NCCU Maroon (brand/CTA color)
- `coral-*` — Charcoal (secondary accent, despite the name)
- `sun-*` — NCCU Black
- `mint-*` — NCCU Gray
- `ink-*` — neutral text/border scale from black to light gray
- `surface` / `surface-soft` — card and page backgrounds

Fonts: `--font-body` (Plus Jakarta Sans) is the default; `--font-display` (Space Grotesk, via the `.font-display` utility class) is used for headings. Don't introduce new colors or fonts outside this system — extend the existing scales instead.

## Verifying changes

- Type-check: `node_modules/typescript/bin/tsc --noEmit` (already allowlisted in `.claude/settings.local.json`).
- Run the dev server via the `netcentral-dev` launch config (port 3000) and check it responds before calling UI work done.

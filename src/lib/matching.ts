import { quizQuestions } from "@/data/quiz";
import { majors as allMajorsData } from "@/data/majors";
import {
  InterestTag,
  Major,
  MajorMatch,
  QuizQuestion,
  RiasecKey,
  RiasecScores,
  ValueTag,
} from "@/lib/types";

export type QuizAnswers = Record<string, string[]>;

const EMPTY_RIASEC: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

const RIASEC_LABELS: Record<RiasecKey, string> = {
  R: "hands-on, build-it-yourself energy",
  I: "analytical, dig-into-the-problem thinking",
  A: "creative, original expression",
  S: "people-first, helping instincts",
  E: "leadership and persuasion energy",
  C: "organized, detail-driven follow-through",
};

const VALUE_LABELS: Record<ValueTag, string> = {
  stability: "a stable, dependable path",
  income: "strong earning potential",
  creativity: "room to create and express yourself",
  helping: "work that helps people",
  prestige: "a career people respect",
  flexibility: "flexibility to live life on your terms",
};

const INTEREST_LABELS: Record<InterestTag, string> = {
  technology: "technology",
  numbers: "working with numbers",
  writing: "writing",
  design: "design",
  science: "science",
  business: "business",
  people: "connecting with people",
  building: "building things",
  communication: "communication",
  leadership: "leadership",
  research: "research",
  languages: "languages",
  movement: "staying active",
};

export interface QuizScores {
  riasec: RiasecScores;
  valueCounts: Partial<Record<ValueTag, number>>;
  interestCounts: Partial<Record<InterestTag, number>>;
}

export function scoreAnswers(
  answers: QuizAnswers,
  questions: QuizQuestion[] = quizQuestions
): QuizScores {
  const riasec: RiasecScores = { ...EMPTY_RIASEC };
  const valueCounts: Partial<Record<ValueTag, number>> = {};
  const interestCounts: Partial<Record<InterestTag, number>> = {};

  for (const question of questions) {
    const selectedIds = answers[question.id] ?? [];
    const multiplier = question.weightMultiplier ?? 1;

    for (const optionId of selectedIds) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;

      if (option.weights) {
        for (const key of Object.keys(option.weights) as RiasecKey[]) {
          riasec[key] += (option.weights[key] ?? 0) * multiplier;
        }
      }
      if (option.valueTags) {
        for (const tag of option.valueTags) {
          valueCounts[tag] = (valueCounts[tag] ?? 0) + multiplier;
        }
      }
      if (option.interestTags) {
        for (const tag of option.interestTags) {
          interestCounts[tag] = (interestCounts[tag] ?? 0) + multiplier;
        }
      }
    }
  }

  return { riasec, valueCounts, interestCounts };
}

function topKeys<T extends string>(
  counts: Partial<Record<T, number>>,
  n: number
): T[] {
  return (Object.entries(counts) as [T, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

export function matchMajors(
  scores: QuizScores,
  allMajors: Major[] = allMajorsData,
  topN = 5
): MajorMatch[] {
  const topTraits = topKeys(
    Object.fromEntries(
      (Object.keys(scores.riasec) as RiasecKey[]).map((k) => [k, scores.riasec[k]])
    ) as Record<RiasecKey, number>,
    2
  );
  const topValues = topKeys(scores.valueCounts, 3);
  const topInterests = topKeys(scores.interestCounts, 4);

  const matches: MajorMatch[] = allMajors.map((major) => {
    let riasecScore = 0;
    for (const key of Object.keys(major.riasec) as RiasecKey[]) {
      riasecScore += major.riasec[key] * scores.riasec[key];
    }

    const matchedValueTags = major.valueTags.filter((t) => topValues.includes(t));
    const matchedInterestTags = major.interestTags.filter((t) =>
      topInterests.includes(t)
    );

    const total =
      riasecScore + matchedValueTags.length * 6 + matchedInterestTags.length * 4;

    const matchedTraitLabels = topTraits
      .filter((t) => major.riasec[t] >= 2)
      .map((t) => RIASEC_LABELS[t]);

    const matchedValueLabels = matchedValueTags.map((t) => VALUE_LABELS[t]);
    const matchedInterestLabels = matchedInterestTags.map((t) => INTEREST_LABELS[t]);

    const reason = buildReason(
      major.name,
      matchedTraitLabels,
      matchedValueLabels,
      matchedInterestLabels
    );

    return {
      major,
      score: total,
      matchedTraitLabels,
      matchedValueLabels,
      matchedInterestLabels,
      reason,
    };
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, topN);
}

function buildReason(
  majorName: string,
  traits: string[],
  values: string[],
  interests: string[]
): string {
  const parts: string[] = [];

  if (traits.length > 0) {
    parts.push(`your ${traits.join(" and ")}`);
  }
  if (interests.length > 0) {
    parts.push(`your interest in ${interests.slice(0, 2).join(" and ")}`);
  }
  if (values.length > 0) {
    parts.push(`how much you value ${values[0]}`);
  }

  if (parts.length === 0) {
    return `${majorName} is a solid, well-rounded option worth exploring further.`;
  }

  return `${majorName} lines up with ${parts.join(", ")}.`;
}

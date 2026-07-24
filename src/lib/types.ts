export type RiasecKey = "R" | "I" | "A" | "S" | "E" | "C";

export type RiasecScores = Record<RiasecKey, number>;

export type ValueTag =
  | "stability"
  | "income"
  | "creativity"
  | "helping"
  | "prestige"
  | "flexibility";

export type InterestTag =
  | "technology"
  | "numbers"
  | "writing"
  | "design"
  | "science"
  | "business"
  | "people"
  | "building"
  | "communication"
  | "leadership"
  | "research"
  | "languages"
  | "movement";

export interface QuizOption {
  id: string;
  label: string;
  weights?: Partial<RiasecScores>;
  valueTags?: ValueTag[];
  interestTags?: InterestTag[];
}

export interface QuizQuestion {
  id: string;
  section: "Personality" | "Hobbies & Interests" | "Academic Strengths" | "Family & Values" | "Work Style";
  prompt: string;
  helper?: string;
  type: "single" | "multi";
  maxSelect?: number;
  weightMultiplier?: number;
  options: QuizOption[];
}

export interface Major {
  id: string;
  name: string;
  category: string;
  description: string;
  riasec: RiasecScores;
  valueTags: ValueTag[];
  interestTags: InterestTag[];
  careerPaths: string[];
}

export interface MajorMatch {
  major: Major;
  score: number;
  matchedTraitLabels: string[];
  matchedValueLabels: string[];
  matchedInterestLabels: string[];
  reason: string;
}

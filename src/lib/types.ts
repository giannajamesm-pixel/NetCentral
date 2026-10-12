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

export interface StudentOrg {
  name: string;
  uri?: string;
  url?: string;
}

export interface Career {
  id: string;
  title: string;
  majorIds: string[];
  summary: string;
  // U.S. annual pay (low ≈ 10th percentile, high ≈ 90th percentile).
  // Omitted for careers with no reliable annual figure (e.g. gig work);
  // low/high are omitted when only a median is published.
  salary?: { low?: number; median: number; high?: number };
  // Projected 10-year employment growth, percent.
  growthPct?: number;
  // Bureau of Labor Statistics Occupational Outlook Handbook page for the figures.
  blsUrl?: string;
  employers: string[];
  strategies: string[];
  // NCCU student organizations related to this career, best fit first. Give
  // either `uri` (the slug of its Eagle Link page, nccu.presence.io/organization/<uri>)
  // or `url` (a full link, for groups listed elsewhere such as the School of Business).
  studentOrgs?: StudentOrg[];
  // National professional organizations for the career (certifications,
  // student memberships, job boards), shown as links in the expanded card.
  resources?: { name: string; url: string }[];
  skills: string[];
  trajectory: string[];
}

export interface MajorMatch {
  major: Major;
  score: number;
  matchedTraitLabels: string[];
  matchedValueLabels: string[];
  matchedInterestLabels: string[];
  reason: string;
}

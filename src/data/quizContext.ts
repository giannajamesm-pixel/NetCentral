// Tailors the quiz results' "Next steps" card from the region (v6) and
// household income (v7) answers. Neither answer affects major ranking.

export const REGION_QUESTION_ID = "v6";
export const INCOME_QUESTION_ID = "v7";

export interface AidLink {
  name: string;
  url: string;
  note: string;
}

// Keyed by v6 option id.
export const regionNotes: Record<string, string> = {
  "v6-1":
    "You're already in NCCU's backyard. Research Triangle Park is one of the country's biggest hubs for tech, biotech, and pharmaceutical jobs, and Durham, Raleigh, and Chapel Hill add hospitals, universities, and state government.",
  "v6-2":
    "Charlotte is the second-largest banking center in the U.S., with big employers in finance, energy, and healthcare, so business and tech majors have plenty of internships close to home.",
  "v6-3":
    "The Triad's biggest employers are in healthcare, logistics, and advanced manufacturing. It's about an hour from Durham, so internships at home over the summer are realistic.",
  "v6-4":
    "Eastern NC's hospital systems, schools, and military bases are always hiring in nursing, teaching, social work, and public service, so it's a strong place to build a career rooted in your community.",
  "v6-5":
    "Western NC's employers are mostly in healthcare, education, outdoor recreation, and manufacturing. Remote-friendly careers in tech and business also let you live in the mountains and work anywhere.",
  "v6-6":
    "NCCU puts you right in the Research Triangle. Summer internships here can be a strong start, and most of the careers you'll see hire nationwide.",
  "v6-7":
    "NCCU's international student office can help you plan around visa rules. Ask early which internships fit your status (for F-1 students, that means CPT and OPT work authorization).",
};

// Every student should file the FAFSA, whatever their income.
export const baseAidLinks: AidLink[] = [
  {
    name: "File the FAFSA",
    url: "https://studentaid.gov/h/apply-for-aid/fafsa",
    note: "Unlocks federal grants, work-study, and most NCCU aid. Renew it every year.",
  },
  {
    name: "NCCU Scholarships and Student Aid",
    url: "https://www.nccu.edu/ssa",
    note: "NCCU's financial aid office, for award letters, deadlines, and questions about your package.",
  },
  {
    name: "NCCU Scholarship Portal",
    url: "https://nccu.academicworks.com/",
    note: "One application matches you to NCCU scholarships.",
  },
];

// Next NC covers families with an adjusted gross income of $80,000 or less,
// so it's shown for those brackets plus "Not sure" and "Prefer not to say".
const nextNcLink: AidLink = {
  name: "Next NC Scholarship",
  url: "https://www.cfnc.org/news/next-nc-scholarship-will-help-cover-tuition/",
  note: "For NC residents with household income of $80,000 or less: at least $5,000 a year at UNC System schools like NCCU. Filing the FAFSA is the only application.",
};

const NEXT_NC_INCOME_OPTIONS = new Set(["v7-1", "v7-2", "v7-3", "v7-6", "v7-7"]);
const NC_REGION_OPTIONS = new Set(["v6-1", "v6-2", "v6-3", "v6-4", "v6-5"]);

export function aidLinksFor(regionId?: string, incomeId?: string): AidLink[] {
  // Next NC is for NC residents, so skip it only when we know they aren't one.
  const maybeNcResident = !regionId || NC_REGION_OPTIONS.has(regionId);
  const showNextNc = maybeNcResident && (!incomeId || NEXT_NC_INCOME_OPTIONS.has(incomeId));
  return showNextNc ? [baseAidLinks[0], nextNcLink, ...baseAidLinks.slice(1)] : baseAidLinks;
}

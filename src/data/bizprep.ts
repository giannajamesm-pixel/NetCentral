// BizPrep content: campus career events, career fair employers, and resume
// templates. Fair names and the recruiting window come from NCCU's Career &
// Professional Development Center (nccu.edu/dsa/student-support). Exact
// dates and employer lists are published in Handshake, which requires an NCCU
// login, so they are added here by hand as they are announced.

export const HANDSHAKE_URL = "https://nccu.joinhandshake.com/";
export const CAREER_CENTER_URL = "https://www.nccu.edu/dsa/student-support/students";

export interface CampusEvent {
  id: string;
  title: string;
  kind: "Career Fair" | "Workshop" | "Networking" | "Info Session";
  // ISO date (YYYY-MM-DD). Omit while the date is still TBA; dated events
  // drop off the page once they have passed.
  date?: string;
  // Shown instead of a date when `date` is omitted, e.g. "Fall 2026".
  timing?: string;
  time?: string;
  location?: string;
  description: string;
  // Who should go, e.g. "All majors" or "Business & IT majors".
  audience: string;
  url?: string;
}

export const campusEvents: CampusEvent[] = [
  {
    id: "business-it-fair",
    title: "Business & IT Career Fair",
    kind: "Career Fair",
    timing: "Fall semester",
    description:
      "Meet organizations hiring for business administration, marketing, sales, hospitality, communications, finance, accounting, and IT roles. Dress business professional and bring printed copies of your resume.",
    audience: "Business, communications & IT majors",
    url: HANDSHAKE_URL,
  },
  {
    id: "all-majors-fair",
    title: "All Majors Career Fair",
    kind: "Career Fair",
    timing: "Fall & spring semesters",
    description:
      "Employers from every industry recruit NCCU students for internships and full-time roles. A good first fair if you're still figuring out where you fit.",
    audience: "All majors",
    url: HANDSHAKE_URL,
  },
  {
    id: "brite-expo",
    title: "BRITE Career Expo",
    kind: "Career Fair",
    timing: "Check Handshake for date",
    description:
      "Connect with employers offering internships and full-time roles in pharmaceuticals and STEM research.",
    audience: "STEM & pharmaceutical science majors",
    url: HANDSHAKE_URL,
  },
];

export interface FairCompany {
  name: string;
  // Matches a CampusEvent `id`.
  fairId: string;
  industry: string;
  hiringFor: ("Internships" | "Full-time" | "Co-op")[];
  url?: string;
}

// Add employers here once the Career Center posts the attendee list, e.g.
// { name: "Example Co.", fairId: "business-it-fair", industry: "Finance", hiringFor: ["Internships"] }
export const fairCompanies: FairCompany[] = [];

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  format: "Google Docs" | "Google Slides" | "Word download";
  href: string;
  // True for a file served from /public that the browser should download.
  download?: string;
}

// Google links use /copy so each student gets their own editable copy in their
// Google Drive instead of editing (or requesting access to) the original.
export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic Resume",
    description: "A clean, timeless layout that works for almost any internship or job.",
    format: "Google Docs",
    href: "https://docs.google.com/document/d/1A1rA8UJ41R3QluPrgcMgnxbzkHi2udo7bN4vCllF08s/copy",
  },
  {
    id: "easy",
    name: "Easy Resume",
    description: "A simple fill-in-the-blanks layout, great for your first resume.",
    format: "Google Docs",
    href: "https://docs.google.com/document/d/1PTX6wDsvUFH5K2TF2ABErqtf5PWTaYsH2ha0gVbbIOE/copy",
  },
  {
    id: "traditional",
    name: "Traditional Resume",
    description: "A polished, formal design for corporate and professional roles.",
    format: "Google Slides",
    href: "https://docs.google.com/presentation/d/12i8k6tzgpTVRsdEWf1sH4g7Du-0MXQ8XcUI_O0FtXMg/copy",
  },
  {
    id: "harvard",
    name: "Harvard Resume",
    description: "The well-known Harvard format, with tips built into every section.",
    format: "Word download",
    href: "/templates/harvard-resume.docx",
    download: "Harvard Resume Template.docx",
  },
];

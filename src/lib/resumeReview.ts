// Rule-based resume review that runs entirely in the browser: the student's
// file is parsed locally and never uploaded anywhere.

export interface ReviewItem {
  id: string;
  status: "good" | "fix" | "tip";
  title: string;
  detail: string;
}

export interface ReviewResult {
  items: ReviewItem[];
  score: number;
  wordCount: number;
  // Only populated when a job description was provided.
  keywordsFound: string[];
  keywordsMissing: string[];
}

export interface ReviewInput {
  text: string;
  position: string;
  company: string;
  jobDescription?: string;
}

// --- Text extraction -------------------------------------------------------

export const ACCEPTED_TYPES = ".pdf,.docx,.txt";

export async function extractResumeText(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt")) return file.text();

  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const { value } = await mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer(),
    });
    return value;
  }

  if (name.endsWith(".pdf")) {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      for (const item of content.items) {
        if ("str" in item) text += item.str + (item.hasEOL ? "\n" : "");
      }
      text += "\n";
    }
    return text;
  }

  if (name.endsWith(".doc")) {
    throw new Error(
      "Older .doc files can't be read. In Word, choose File → Save As → .docx (or PDF) and upload that instead."
    );
  }
  throw new Error("Please upload a PDF, Word (.docx), or plain-text (.txt) file.");
}

// --- Word lists ------------------------------------------------------------

const ACTION_VERBS = new Set(
  `achieved administered advised analyzed arranged assembled assessed assisted audited authored balanced budgeted built calculated chaired coached collaborated collected compiled completed composed conducted consulted coordinated created cultivated customized delivered designed developed devised directed drafted earned edited educated eliminated engineered enhanced established evaluated exceeded executed expanded facilitated forecasted formulated founded generated guided handled hosted identified implemented improved increased influenced initiated inspected installed instructed integrated interviewed introduced investigated launched led maintained managed marketed mentored modeled monitored motivated negotiated operated optimized orchestrated organized oversaw partnered performed persuaded piloted planned prepared presented prioritized processed produced programmed promoted proposed published raised recruited redesigned reduced refined reorganized represented researched resolved restructured reviewed revamped scheduled secured served simplified sold solved spearheaded streamlined strengthened supervised supported surveyed taught tested tracked trained transformed translated tutored updated upgraded volunteered won wrote accelerated adapted advocated answered applied boosted brainstormed captured cataloged championed clarified communicated configured contributed converted cut debugged demonstrated documented drove empowered encouraged engaged expedited explained filed fostered gathered greeted grew headed illustrated informed interpreted logged mapped measured moderated navigated observed obtained outlined photographed pitched posted predicted queried ran reached recorded registered reported responded restored retained revised scaled screened selected shaped shared shipped sorted sourced staffed standardized steered stocked styled summarized supplied surpassed sustained synthesized tailored uncovered unified verified visualized welcomed`.split(
    /\s+/
  )
);

const WEAK_PHRASES = [
  "responsible for",
  "duties included",
  "duties include",
  "worked on",
  "helped with",
  "in charge of",
  "tasked with",
  "various tasks",
];

const STOPWORDS = new Set(
  `a about above after again all also am an and any are as at be because been before being below between both but by can could did do does doing down during each few for from further had has have having he her here hers him his how i if in into is it its itself just me more most my no nor not now of off on once only or other our ours out over own same she should so some such than that the their them then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours`.split(
    /\s+/
  )
);

// Generic job-posting words that say nothing about the specific role.
const JOB_AD_FILLER = new Set(
  `ability able applicant applicants apply candidate candidates company degree description duties employee employees employer environment equal etc excellent experience including job knowledge looking must new opportunity opportunities position preferred plus qualifications qualified related required requirements responsibilities role strong successful team understanding work working year years ideal join seeking within across well using based highly demonstrated proven minimum provide ensure various other may per day days week weeks month months time`.split(
    /\s+/
  )
);

// Skills worth flagging even if the posting mentions them only once.
const KNOWN_SKILLS = [
  "accounting", "adobe", "agile", "analytics", "budgeting", "canva", "coaching",
  "communication", "compliance", "crm", "css", "customer service", "data analysis",
  "data entry", "excel", "event planning", "financial analysis", "financial modeling",
  "google analytics", "html", "java", "javascript", "leadership", "logistics",
  "marketing", "microsoft office", "negotiation", "powerpoint", "presentation",
  "problem solving", "project management", "public speaking", "python", "quickbooks",
  "recruiting", "research", "salesforce", "sales", "scheduling", "seo",
  "social media", "spanish", "sql", "supply chain", "tableau", "teamwork",
  "time management", "writing",
];

// --- Helpers ---------------------------------------------------------------

function normalize(s: string) {
  return s.toLowerCase().replace(/[’']/g, "'");
}

function includesTerm(haystack: string, term: string) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}(s|es|ing|ed)?([^a-z0-9]|$)`).test(haystack);
}

function contentLines(text: string) {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^[\s•●▪◦\-–—*·]+/, "").trim())
    .filter((l) => l.split(/\s+/).length >= 4);
}

export function extractKeywords(jobDescription: string, limit = 15): string[] {
  const words = normalize(jobDescription)
    .replace(/[^a-z0-9+#/\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const meaningful = (w: string) =>
    w.length >= 3 && !STOPWORDS.has(w) && !JOB_AD_FILLER.has(w) && !/^\d+$/.test(w);

  const counts = new Map<string, number>();
  const bump = (k: string) => counts.set(k, (counts.get(k) ?? 0) + 1);
  for (let i = 0; i < words.length; i++) {
    if (meaningful(words[i])) bump(words[i]);
    if (i + 1 < words.length && meaningful(words[i]) && meaningful(words[i + 1])) {
      bump(`${words[i]} ${words[i + 1]}`);
    }
  }

  const jd = normalize(jobDescription);
  // Longest first so "google analytics" wins over "analytics".
  const skills = KNOWN_SKILLS.filter((s) => includesTerm(jd, s)).sort(
    (a, b) => b.length - a.length
  );
  const repeated = [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || b[0].split(" ").length - a[0].split(" ").length)
    .map(([k]) => k);

  const picked: string[] = [];
  for (const k of [...skills, ...repeated]) {
    // Skip a word already covered by a picked phrase (or vice versa).
    if (picked.some((p) => p.includes(k) || k.includes(p))) continue;
    picked.push(k);
    if (picked.length >= limit) break;
  }
  return picked;
}

// --- Review ----------------------------------------------------------------

export function reviewResume({
  text,
  position,
  company,
  jobDescription,
}: ReviewInput): ReviewResult {
  const items: ReviewItem[] = [];
  const lower = normalize(text);
  const lines = contentLines(text);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const role = position.trim() || "this role";
  const org = company.trim() || "this company";

  // Contact info
  const hasEmail = /[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(text);
  const hasPhone = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(text);
  const missingContact = [!hasEmail && "an email address", !hasPhone && "a phone number"].filter(Boolean);
  items.push(
    missingContact.length
      ? {
          id: "contact",
          status: "fix",
          title: "Add your contact info",
          detail: `We couldn't find ${missingContact.join(" or ")}. Put your name, phone, and a professional email at the very top so ${org} can reach you.`,
        }
      : {
          id: "contact",
          status: "good",
          title: "Contact info is there",
          detail: "Your email and phone number are easy to find.",
        }
  );
  if (!lower.includes("linkedin")) {
    items.push({
      id: "linkedin",
      status: "tip",
      title: "Add your LinkedIn",
      detail: "Recruiters often look you up. Add your LinkedIn URL next to your email and make sure your profile matches your resume.",
    });
  }

  // Core sections
  const sections: [string, RegExp][] = [
    ["Education", /\beducation\b/],
    ["Experience", /\b(experience|employment|work history)\b/],
    ["Skills", /\bskills\b/],
  ];
  const missingSections = sections.filter(([, re]) => !re.test(lower)).map(([n]) => n);
  items.push(
    missingSections.length
      ? {
          id: "sections",
          status: "fix",
          title: `Add a ${missingSections.join(", ")} section`,
          detail: "Recruiters skim for clearly labeled Education, Experience, and Skills headings. Without them, important details are easy to miss.",
        }
      : {
          id: "sections",
          status: "good",
          title: "All the key sections are there",
          detail: "Education, Experience, and Skills are clearly labeled.",
        }
  );
  if (!/\b(leadership|activities|involvement|organizations|volunteer|service)\b/.test(lower)) {
    items.push({
      id: "leadership",
      status: "tip",
      title: "Show your campus involvement",
      detail: "Add a Leadership & Activities section for student orgs, Greek life, volunteering, or athletics. For students, it shows the teamwork and initiative employers ask about.",
    });
  }

  // Education details
  if (!/\b(20\d{2})\b/.test(lower) || !/\b(university|college)\b/.test(lower)) {
    items.push({
      id: "education-detail",
      status: "fix",
      title: "Spell out your education",
      detail: "List North Carolina Central University, your degree and major, and your expected graduation (e.g. \"Expected May 2028\").",
    });
  } else if (!/\bgpa\b/.test(lower)) {
    items.push({
      id: "gpa",
      status: "tip",
      title: "Consider adding your GPA",
      detail: "If your GPA is 3.0 or higher, add it under Education. Many employers screen for it.",
    });
  }

  // Length
  if (wordCount < 200) {
    items.push({
      id: "length",
      status: "fix",
      title: "Your resume looks thin",
      detail: `About ${wordCount} words. Add class projects, campus jobs, volunteer work, or org roles. Anything where you took responsibility counts.`,
    });
  } else if (wordCount > 850) {
    items.push({
      id: "length",
      status: "fix",
      title: "Trim it to one page",
      detail: `About ${wordCount} words. Students should usually fit on one page. Cut older or less relevant items and keep what matters most for ${role}.`,
    });
  } else {
    items.push({
      id: "length",
      status: "good",
      title: "Good length",
      detail: `About ${wordCount} words, a solid fit for a one-page student resume.`,
    });
  }

  // Weak phrasing
  const weak = WEAK_PHRASES.filter((p) => lower.includes(p));
  if (weak.length) {
    items.push({
      id: "weak-phrases",
      status: "fix",
      title: "Replace passive phrases",
      detail: `Swap "${weak.join('", "')}" for an action verb that shows what you did. For example, "Responsible for social media" becomes "Grew Instagram following 40% in one semester."`,
    });
  }

  // Action verbs
  // Skip contact lines, comma-separated skill lists, and short title/date
  // lines so only accomplishment bullets are judged.
  const bullets = lines.filter(
    (l) =>
      !/[@|]/.test(l) &&
      (l.match(/,/g) ?? []).length < 3 &&
      !(/\b(19|20)\d{2}\b/.test(l) && l.split(/\s+/).length <= 10)
  );
  if (bullets.length >= 3) {
    const verbLines = bullets.filter((l) => {
      const first = l.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
      return ACTION_VERBS.has(first);
    });
    const ratio = verbLines.length / bullets.length;
    items.push(
      ratio >= 0.5
        ? {
            id: "verbs",
            status: "good",
            title: "Strong action verbs",
            detail: "Your bullet points lead with what you did.",
          }
        : {
            id: "verbs",
            status: "fix",
            title: "Start bullets with action verbs",
            detail: "Begin each bullet with a verb like Led, Organized, Built, Analyzed, or Increased. It makes your impact clear in the few seconds a recruiter spends on each resume.",
          }
    );
  }

  // Quantified results (numbers other than years and phone numbers)
  const quantified = lines.filter((l) =>
    /(\d+(\.\d+)?\s?%|\$\s?\d|\b\d{1,3}(,\d{3})+\b|\b(?!19\d{2}\b|20\d{2}\b)\d+\+?\s+[a-z])/i.test(l)
  ).length;
  items.push(
    quantified >= 3
      ? {
          id: "numbers",
          status: "good",
          title: "You show measurable results",
          detail: `${quantified} lines include numbers. That's what makes accomplishments stick.`,
        }
      : {
          id: "numbers",
          status: "fix",
          title: "Quantify your impact",
          detail: "Add numbers wherever you can: how many people, how much money, what % improvement, how often. \"Tutored 12 students weekly\" beats \"Tutored students.\"",
        }
  );

  // Personal pronouns
  if (/\b(I|me|my|mine)\b/.test(text)) {
    items.push({
      id: "pronouns",
      status: "fix",
      title: "Remove personal pronouns",
      detail: "Drop \"I\", \"me\", and \"my\". Resume bullets should read as short phrases (\"Managed...\"), not full sentences.",
    });
  }

  // Tailoring to the role
  const roleWords = normalize(position)
    .split(/[^a-z0-9+#]+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && !["intern", "internship", "assistant", "associate", "junior", "senior", "entry", "level", "part", "full"].includes(w));
  if (roleWords.length) {
    const matched = roleWords.filter((w) => includesTerm(lower, w));
    items.push(
      matched.length
        ? {
            id: "role-fit",
            status: "good",
            title: `Connects to ${role}`,
            detail: `Your resume mentions ${matched.map((w) => `"${w}"`).join(", ")}, which ties your background to the role.`,
          }
        : {
            id: "role-fit",
            status: "fix",
            title: `Make the link to ${role} obvious`,
            detail: `Nothing in your resume mentions ${roleWords.map((w) => `"${w}"`).join(" or ")}. Add a one-line summary at the top (e.g. "Business Administration student seeking a ${role} role at ${org}") and move your most relevant experience higher.`,
          }
    );
  }

  // Job description keywords
  let keywordsFound: string[] = [];
  let keywordsMissing: string[] = [];
  if (jobDescription?.trim()) {
    const keywords = extractKeywords(jobDescription);
    keywordsFound = keywords.filter((k) => includesTerm(lower, k));
    keywordsMissing = keywords.filter((k) => !includesTerm(lower, k));
    if (keywords.length) {
      items.push(
        keywordsMissing.length > keywords.length / 2
          ? {
              id: "keywords",
              status: "fix",
              title: "Mirror the job description",
              detail: `Only ${keywordsFound.length} of ${keywords.length} key terms from the posting appear in your resume. Many employers use applicant tracking systems that scan for these words. Add the ones below where they honestly describe your experience.`,
            }
          : {
              id: "keywords",
              status: "good",
              title: "Matches the job description",
              detail: `${keywordsFound.length} of ${keywords.length} key terms from the posting show up in your resume.${keywordsMissing.length ? " Consider working in the rest if they apply to you." : ""}`,
            }
      );
    }
  } else {
    items.push({
      id: "keywords",
      status: "tip",
      title: "Paste the job description for a keyword check",
      detail: `Most employers scan resumes for terms from the posting. Paste the ${role} description above and we'll show which ones you're missing.`,
    });
  }

  // Company-specific tailoring (always relevant, can't be verified from text)
  items.push({
    id: "company",
    status: "tip",
    title: `Tailor it for ${org}`,
    detail: `Read ${org}'s careers page and mission statement. Reorder your bullets so the experience closest to what ${org} values comes first, and use the same words they use. Send a version made for ${org}, not the same resume you send everywhere.`,
  });

  const graded = items.filter((i) => i.status !== "tip");
  const score = graded.length
    ? Math.round((graded.filter((i) => i.status === "good").length / graded.length) * 100)
    : 0;

  // Fixes first, then tips, then strengths.
  const order = { fix: 0, tip: 1, good: 2 };
  items.sort((a, b) => order[a.status] - order[b.status]);

  return { items, score, wordCount, keywordsFound, keywordsMissing };
}

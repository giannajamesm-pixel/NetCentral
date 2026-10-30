// Builds a 4-year college roadmap for a career. Every career gets one: a
// "track" (nursing, teaching, tech, research, ...) supplies the year-by-year
// skeleton and the standard exams/certs for that path, then the career's own
// data (strategies, skills, NCCU orgs, professional orgs, employers, first
// job) is slotted into the right years. Careers can be hand-tuned later by
// adding more specific `strategies` in careers.ts.

import { HANDSHAKE_URL } from "@/data/bizprep";
import { careerSkills, simulationsFor } from "@/data/simulations";
import { Career, Major } from "@/lib/types";

export type StepType = "class" | "project" | "cert" | "experience" | "org" | "milestone";

export interface RoadmapStep {
  type: StepType;
  title: string;
  detail?: string;
  href?: string;
}

export interface RoadmapYear {
  year: 1 | 2 | 3 | 4;
  label: string;
  theme: string;
  steps: RoadmapStep[];
}

export interface Roadmap {
  track: Track;
  // Set when the career needs a graduate or professional degree.
  gradSchool?: { school: string; exam?: string; examHref?: string };
  years: RoadmapYear[];
  firstJob: string;
  afterGraduation?: string;
}

type Track =
  | "nursing"
  | "teaching"
  | "tech"
  | "cyber"
  | "engineering"
  | "analytics"
  | "prehealth"
  | "research"
  | "health"
  | "business"
  | "creative"
  | "social"
  | "general";

const ORG_BASE_URL = "https://nccu.presence.io/organization/";
const REU_URL = "https://www.nsf.gov/funding/initiatives/reu";

const RESEARCH_MAJORS = [
  "biological-biomedical-sciences",
  "chemistry-biochemistry",
  "physics",
  "environmental-earth-geographic-science",
  "mathematics",
  "pharmaceutical-sciences",
];
const TECH_MAJORS = ["computer-information-sciences", "information-technology"];
const BUSINESS_MAJORS = ["business-administration", "accounting", "hospitality-tourism-administration"];
const CREATIVE_MAJORS = ["mass-communication", "art-and-design", "music", "theatre", "language-and-literature"];
const SOCIAL_MAJORS = ["psychology", "social-work", "criminal-justice", "political-science", "history", "behavioral-social-sciences", "interdisciplinary-studies"];
const HEALTH_MAJORS = ["kinesiology-recreation-administration", "public-health-education", "health-administration", "nutrition-dietetics"];

// Health careers that need a professional degree after college.
const PREHEALTH_IDS = [
  "physician", "physician-assistant", "pharmacist", "physical-therapist", "occupational-therapist", "chiropractor",
  "anesthesiologist-assistant", "genetic-counselor", "perfusionist", "speech-language-pathologist", "orthotist-prosthetist", "forensic-pathologist",
];
// Careers in science majors that are really business, communication,
// hands-on health, or public-facing roles.
const BUSINESS_IDS = ["pharmaceutical-sales-representative", "regulatory-affairs-specialist", "medical-device-sales-representative", "product-specialist", "ecotourism-specialist", "technical-consultant"];
const CREATIVE_IDS = ["technical-writer", "medical-illustrator", "science-writer", "sound-engineering-technician"];
const HEALTH_IDS = [
  "paramedic", "respiratory-therapist", "radiation-therapist", "nuclear-medicine-technologist",
  "clinical-laboratory-technician", "medical-laboratory-scientist", "blood-bank-technologist", "cytotechnologist", "cytogenetic-technologist",
];
const SOCIAL_IDS = ["park-ranger", "museum-technician", "environmental-lobbyist"];

function trackFor(career: Career): Track {
  const primary = career.majorIds[0];
  const text = `${career.id} ${career.title}`.toLowerCase();
  if (primary === "nursing" && /nurse|crna|midwife/.test(text)) return "nursing";
  if (/teacher|educator|curriculum/.test(text)) return "teaching";
  if (/cyber|security|threat|vulnerability|forensics analyst|incident|privacy/.test(text)) return "cyber";
  if (PREHEALTH_IDS.includes(career.id)) return "prehealth";
  if (BUSINESS_IDS.includes(career.id)) return "business";
  if (CREATIVE_IDS.includes(career.id)) return "creative";
  if (HEALTH_IDS.includes(career.id)) return "health";
  if (SOCIAL_IDS.includes(career.id)) return "social";
  if (TECH_MAJORS.includes(primary)) return "tech";
  if (/engineer\b|engineering technician/.test(text) && !/software|machine learning|financial/.test(text)) return "engineering";
  if (
    RESEARCH_MAJORS.includes(primary) &&
    !/quality control/.test(text) &&
    /analyst|actuar|financial|investment|pricing|budget|cost|market|supply chain|project manager|planner|surveyor|algorithm|machine learning|demographer|economist/.test(text)
  ) {
    return "analytics";
  }
  if (RESEARCH_MAJORS.includes(primary)) return "research";
  if (HEALTH_MAJORS.includes(primary) || primary === "nursing") return "health";
  if (BUSINESS_MAJORS.includes(primary)) return "business";
  if (CREATIVE_MAJORS.includes(primary)) return "creative";
  if (SOCIAL_MAJORS.includes(primary)) return "social";
  if (["early-childhood-education", "elementary-education", "middle-grades-education"].includes(primary)) return "teaching";
  return "general";
}

// Careers that need a graduate or professional degree before the first job.
// Only triggers on required paths (summary wording or "Plan for ..." advice),
// not on optional "consider a master's" suggestions.
function gradSchoolFor(career: Career, track: Track): Roadmap["gradSchool"] {
  if (track === "nursing") return undefined; // APRNs work as RNs first; see afterGraduation.
  const summary = career.summary.toLowerCase();
  const plans = career.strategies.filter((s) => /^plan for/i.test(s)).join(" ").toLowerCase();
  const text = `${summary} ${plans}`;
  if (/medical school/.test(text)) {
    return { school: "medical school", exam: "MCAT", examHref: "https://students-residents.aamc.org/taking-mcat-exam/take-mcat-exam" };
  }
  if (/law school/.test(text) && !/without (going to )?law school/.test(text)) return { school: "law school", exam: "LSAT", examHref: "https://www.lsac.org/lsat" };
  if (career.id === "physician-assistant") return { school: "physician assistant (PA) programs", exam: "GRE or PA-CAT, if your programs require one" };
  if (/doctor of physical therapy|\bdpt\b/.test(text)) return { school: "Doctor of Physical Therapy (DPT) programs", exam: "GRE, if your programs require it" };
  if (/doctor of chiropractic/.test(text)) return { school: "Doctor of Chiropractic programs" };
  if (career.id === "pharmacist") return { school: "Doctor of Pharmacy (PharmD) programs" };
  if (/occupational therapy/.test(text)) return { school: "occupational therapy graduate programs", exam: "GRE, if your programs require it" };
  if (/phd|doctorate|doctoral/.test(text)) return { school: "PhD programs", exam: "GRE, if your programs require it" };
  if (/master's/.test(summary) && /required/.test(summary)) return { school: "master's programs", exam: "GRE, if your programs require it" };
  return undefined;
}

// --- Sorting the career's own strategies into step types ------------------

const CERT_RE = /certif|credential|licens|\bexams?\b|\bcpr\b|\bbls\b|acls|pals|nrp|osha|hazwoper|praxis|nclex|cscs|\bcpt\b|patent bar|\bfe\b|\bsie\b|\bcpa\b/i;
const EXPERIENCE_RE = /intern|rotation|placement|preceptor|practicum|shadow|volunteer|co-op|research|observation|hours|summer|seasonal|field|clinical|tutor|job|work|experience|externship|crew/i;
const PROJECT_RE = /build|portfolio|create|project|github|publish|present|compete|competition|hackathon|blog|website/i;

const LATER_RE = /\bgraduate|master's|\bphd\b|\bmba\b|^consider|^look into|clearance/i;

function classify(strategy: string): StepType {
  if (CERT_RE.test(strategy)) return "cert";
  if (/intern|co-op/i.test(strategy)) return "experience";
  if (LATER_RE.test(strategy) || /dual-degree/i.test(strategy)) return "milestone";
  if (PROJECT_RE.test(strategy)) return "project";
  if (EXPERIENCE_RE.test(strategy)) return "experience";
  return "class";
}

// --- Track skeletons --------------------------------------------------------

type YearSteps = [RoadmapStep[], RoadmapStep[], RoadmapStep[], RoadmapStep[]];

function trackSteps(track: Track, career: Career, major: Major): YearSteps {
  const c = career.title;
  switch (track) {
    case "nursing":
      return [
        [
          { type: "class", title: "Finish your nursing prerequisites", detail: "Anatomy & physiology, microbiology, chemistry, and statistics. Strong grades here matter for getting into the clinical nursing courses." },
          { type: "cert", title: "Get CPR / Basic Life Support (BLS) certified", detail: "Required before you can start clinicals." },
        ],
        [
          { type: "milestone", title: "Apply to the upper-division nursing courses", detail: "Many BSN programs have a separate application for the clinical years. Ask your advisor about deadlines." },
          { type: "experience", title: "Get patient-care experience", detail: "Work or volunteer as a CNA, patient care tech, or hospital volunteer." },
        ],
        [
          { type: "experience", title: "Clinical rotations", detail: `Ask for placements related to ${c.toLowerCase()} work when you can.` },
          { type: "experience", title: "Apply for a summer nurse externship", detail: "Paid hospital programs for nursing students between junior and senior year. They often lead to job offers." },
        ],
        [
          { type: "experience", title: "Senior capstone / preceptorship", detail: `Request a preceptorship on a unit that matches your goal (${c}).` },
          { type: "milestone", title: "Apply to new-graduate RN residency programs", detail: "Hospitals hire most new grads through these structured first-year programs." },
          { type: "cert", title: "Pass the NCLEX-RN after graduation", detail: "The national licensing exam every RN must pass.", href: "https://www.nclex.com/" },
        ],
      ];
    case "teaching":
      return [
        [
          { type: "class", title: "Take intro education courses", detail: "Confirm the grade level and subject you want to teach. It decides your licensure area." },
          { type: "experience", title: "Tutor or mentor students", detail: "Campus tutoring, after-school programs, or youth camps all count." },
        ],
        [
          { type: "milestone", title: "Apply to the teacher education program", detail: "Most programs require a separate application, a minimum GPA, and early field hours." },
          { type: "cert", title: "Start preparing for licensure exams", detail: "Your state's teacher licensure tests (for example, the Praxis subject tests)." },
        ],
        [
          { type: "experience", title: "Classroom observation and practicum hours", detail: "Spend time in real classrooms before student teaching." },
        ],
        [
          { type: "experience", title: "Student teaching", detail: "A full semester teaching in a real classroom with a mentor teacher." },
          { type: "cert", title: "Pass your licensure exams and apply for your teaching license" },
          { type: "milestone", title: "Apply to school districts", detail: "Many districts do most of their hiring in the spring." },
        ],
      ];
    case "tech":
      return [
        [
          { type: "class", title: "Learn your first programming language", detail: "Python or Java are common first languages. Code a little every week." },
          { type: "project", title: "Set up GitHub and post your class projects", detail: "Recruiters look at GitHub to see real code." },
          ...(major.id === "information-technology"
            ? [{ type: "cert" as const, title: "Consider CompTIA A+", detail: "A widely recognized first IT certification for support and systems roles." }]
            : []),
        ],
        [
          { type: "class", title: "Data structures, databases, and networking", detail: "The core courses technical interviews are built on." },
          { type: "project", title: "Build a personal project you can demo", detail: `Pick something related to ${c.toLowerCase()} work and finish it end to end.` },
          { type: "project", title: "Join a hackathon", detail: "A weekend team build. Great for your resume and for meeting recruiters." },
        ],
        [
          { type: "experience", title: "Land a summer tech internship", detail: "Big companies open junior-year internship applications as early as late summer and fall. Apply early.", href: HANDSHAKE_URL },
        ],
        [
          { type: "project", title: "Senior capstone and portfolio", detail: "Polish 2–3 projects with clear write-ups on GitHub or a personal site." },
          { type: "milestone", title: "Practice technical interviews and apply for full-time roles", detail: "Many interns receive return offers, so ask your internship team early." },
        ],
      ];
    case "cyber":
      return [
        [
          { type: "class", title: "Learn networking and operating system basics", detail: "Linux, Windows, and how networks move data. Security is built on these." },
          { type: "cert", title: "Consider CompTIA A+ or Network+", detail: "Foundational certs that prove you know the basics." },
        ],
        [
          { type: "cert", title: "Earn CompTIA Security+", detail: "One of the most requested entry-level security certifications, including for many government roles." },
          { type: "project", title: "Compete in capture-the-flag (CTF) competitions", detail: "Hands-on hacking challenges that build real skills and stand out on a resume." },
          { type: "project", title: "Build a home lab", detail: "Set up virtual machines to practice defending and testing systems safely." },
        ],
        [
          { type: "experience", title: "Land a security or IT internship", detail: "Look at government agencies, defense contractors, banks, and security firms. Some roles need U.S. citizenship and a clearance.", href: HANDSHAKE_URL },
        ],
        [
          { type: "cert", title: "Add a second certification", detail: "For example CompTIA CySA+ or a cloud security cert, matched to the roles you want." },
          { type: "milestone", title: "Apply for full-time security roles", detail: "Entry roles like SOC analyst or IT security specialist are common first steps." },
        ],
      ];
    case "engineering":
      return [
        [
          { type: "class", title: "Calculus, physics, and chemistry", detail: "The math and science every engineering path is built on." },
        ],
        [
          { type: "class", title: "Learn CAD and MATLAB or Python", detail: "Design and analysis tools engineers use every day." },
          { type: "project", title: "Join a design team or build an engineering project", detail: "Robotics, solar car, or your own build. Employers love hands-on projects." },
        ],
        [
          { type: "experience", title: "Land an engineering internship or co-op", detail: "Co-ops alternate semesters of paid work with school and often lead to job offers.", href: HANDSHAKE_URL },
        ],
        [
          { type: "project", title: "Senior design project", detail: "A team project that solves a real engineering problem. Bring it to every interview." },
        ],
      ];
    case "analytics":
      return [
        [
          { type: "class", title: "Learn Excel and a programming language", detail: "Python or R. Start with the basics and practice weekly." },
        ],
        [
          { type: "class", title: "Statistics, SQL, and data visualization", detail: "The core toolkit for analyst roles." },
          { type: "project", title: "Analyze a real dataset and share the results", detail: "Use public data and post your work on GitHub or a portfolio site." },
        ],
        [
          { type: "experience", title: "Land an analyst internship", detail: "Banks, insurers, consulting firms, government agencies, and tech companies all hire analysts.", href: HANDSHAKE_URL },
        ],
        [
          { type: "project", title: "Build a portfolio of 2–3 analysis projects", detail: "Show the question, your method, and what you found." },
          { type: "milestone", title: "Practice case and technical interviews", detail: "Expect Excel, SQL, statistics, and \"walk me through your analysis\" questions." },
        ],
      ];
    case "prehealth":
      return [
        [
          { type: "class", title: "Start your prerequisite sciences", detail: "Biology, chemistry, and math. Check the exact prerequisites for the programs you're targeting." },
          { type: "experience", title: "Volunteer in a hospital or clinic", detail: "Programs want to see that you've been around patients." },
        ],
        [
          { type: "experience", title: `Shadow a ${c.toLowerCase().replace(/\s*\(.*\)/, "")}`, detail: "Log your hours. Many programs ask for them." },
          { type: "experience", title: "Join a research lab", detail: "Research experience strengthens health professional school applications." },
        ],
        [
          { type: "experience", title: "Build patient-care hours", detail: "Paid or volunteer roles like CNA, EMT, scribe, or pharmacy tech. Some programs require a minimum number of hours." },
        ],
        [
          { type: "experience", title: "Keep up clinical and volunteer work", detail: "Stay active while you apply. Interviewers will ask what you're doing now." },
        ],
      ];
    case "research":
      return [
        [
          { type: "class", title: `Start your ${major.name} core sequence`, detail: "Plus the math and lab courses your major requires." },
          { type: "experience", title: "Visit faculty labs and ask about getting involved", detail: "Many students start by volunteering a few hours a week." },
        ],
        [
          { type: "experience", title: "Join a faculty research lab", detail: "Real research experience is the biggest boost for science careers and grad school." },
          { type: "class", title: "Learn data analysis", detail: "Excel plus R or Python. Every science field uses it." },
        ],
        [
          { type: "experience", title: "Apply for a paid summer research program", detail: "NSF Research Experiences for Undergraduates (REUs) pay students to do research at universities nationwide. Apply in winter.", href: REU_URL },
        ],
        [
          { type: "project", title: "Senior thesis or research presentation", detail: "Present your work at a conference or NCCU research symposium." },
        ],
      ];
    case "health":
      return [
        [
          { type: "cert", title: "Get CPR / AED and First Aid certified", detail: "Required for most health and fitness jobs and placements." },
          { type: "experience", title: "Volunteer in a health or community setting", detail: "Hospitals, clinics, rec centers, or community health programs." },
        ],
        [
          { type: "experience", title: `Shadow a ${c.toLowerCase().replace(/\s*\(.*\)/, "")}`, detail: "See the job up close and confirm it's right for you." },
        ],
        [
          { type: "experience", title: "Complete an internship", detail: "Many health programs require one, and it often turns into your first job.", href: HANDSHAKE_URL },
        ],
        [],
      ];
    case "business":
      return [
        [
          { type: "class", title: "Master Excel early", detail: "Formulas, pivot tables, and charts show up in almost every business job." },
        ],
        [
          { type: "cert", title: "Earn a Microsoft Office Specialist: Excel certification", detail: "A quick, resume-ready way to prove your skills." },
          { type: "project", title: "Enter a case competition", detail: "Solve a real company's problem with a team and present to judges." },
        ],
        [
          { type: "experience", title: "Land a junior-year internship", detail: "Many companies hire full-time from their junior-year intern class.", href: HANDSHAKE_URL },
          ...(career.majorIds.includes("accounting")
            ? [{ type: "class" as const, title: "Plan your path to 150 credit hours", detail: "Most states, including North Carolina, require 150 semester hours for CPA licensure." }]
            : []),
        ],
        [
          { type: "milestone", title: "Interview and accept a full-time offer", detail: "Fall of senior year is prime recruiting season for many firms." },
        ],
      ];
    case "creative":
      return [
        [
          { type: "project", title: "Start a portfolio of your best work", detail: "Save everything. You'll pick your strongest pieces later." },
        ],
        [
          { type: "project", title: "Create work for real audiences", detail: "Campus media, shows, exhibitions, or freelance clients." },
        ],
        [
          { type: "experience", title: "Land an internship", detail: "Studios, stations, agencies, publishers, theaters, or companies' creative teams.", href: HANDSHAKE_URL },
        ],
        [
          { type: "project", title: "Senior showcase and polished portfolio website", detail: "Your portfolio is your resume in creative fields." },
        ],
      ];
    case "social":
      return [
        [
          { type: "experience", title: "Volunteer with a community organization", detail: `Pick one connected to ${c.toLowerCase()} work.` },
        ],
        [
          { type: "class", title: "Take research methods and statistics", detail: "Needed for most social science careers and graduate programs." },
        ],
        [
          { type: "experience", title: "Internship or field placement with an agency", detail: "Government offices, nonprofits, courts, clinics, or campaigns.", href: HANDSHAKE_URL },
        ],
        [],
      ];
    default:
      return [[], [], [{ type: "experience", title: "Land an internship", href: HANDSHAKE_URL }], []];
  }
}

// --- Build ------------------------------------------------------------------

export function buildRoadmap(career: Career, major: Major): Roadmap {
  const track = trackFor(career);
  const gradSchool = gradSchoolFor(career, track);
  const years = trackSteps(track, career, major);
  const [y1, y2, y3, y4] = years;

  // Common foundation every student should do.
  y1.unshift({
    type: "milestone",
    title: "Meet your advisor and the Career Center",
    detail: "Map out your 4-year course plan and create your Handshake profile.",
    href: HANDSHAKE_URL,
  });

  // Skills from the career, split across the first two years.
  const half = Math.ceil(career.skills.length / 2);
  y1.push({ type: "class", title: "Build core skills", detail: career.skills.slice(0, half).join(" · ") });
  if (career.skills.length > half) {
    y2.push({ type: "class", title: "Build advanced skills", detail: career.skills.slice(half).join(" · ") });
  }

  // NCCU student organizations: join early, lead later.
  const orgs = career.studentOrgs ?? [];
  const orgHref = (o: (typeof orgs)[number]) => o.url ?? `${ORG_BASE_URL}${o.uri}`;
  if (orgs[0]) y1.push({ type: "org", title: `Join ${orgs[0].name}`, detail: "Meet upperclassmen who are on the same path.", href: orgHref(orgs[0]) });
  if (orgs[1]) y2.push({ type: "org", title: `Get involved with ${orgs[1].name}`, href: orgHref(orgs[1]) });
  if (orgs[0]) y3.push({ type: "org", title: `Run for a leadership role in ${orgs[0].name}`, detail: "Leadership roles are strong resume and interview material." });

  // National professional organizations.
  const resources = career.resources ?? [];
  if (resources[0]) {
    y2.push({ type: "org", title: `Join ${resources[0].name}`, detail: "Many professional groups offer student memberships, scholarships, and job boards.", href: resources[0].url });
  }

  // Forage job simulations: a preview of the work before applying for
  // internships (sophomore year), then another before junior-year interviews.
  const sims = simulationsFor(career.id);
  const simDetail = "Free and self-paced on Forage. Sign in with your NCCU email, and add the certificate to your resume and LinkedIn.";
  sims.slice(0, 2).forEach((s, i) => {
    (i === 0 ? y2 : y3).push({ type: "project", title: `Complete the ${s.company} ${s.title} job simulation`, detail: simDetail, href: s.url });
  });
  for (const { year, sim } of careerSkills) {
    years[year - 1].push({ type: "class", title: `Take ${sim.company}'s ${sim.title} course`, detail: "Free and self-paced on Forage.", href: sim.url });
  }

  // The career's own strategies, sorted into the right years by type.
  const certYears = [y2, y3, y4];
  const projectYears = [y2, y3];
  const expYears = [y2, y3];
  const classYears = [y1, y2];
  const counts = { cert: 0, project: 0, experience: 0, class: 0 };
  const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  // Terms that mean two steps are the same thing even when worded differently.
  const KEY_TERMS = ["co-op", "security+", "ctf", "capture-the-flag", "home lab", "github", "hackathon", "nclex", "cpr", "research lab", "case competition", "portfolio website", "student teaching"];
  const existingTitles = years.flat().map((st) => `${st.title} ${st.detail ?? ""}`.toLowerCase());
  const existing = new Set(years.flat().map((st) => norm(st.title)));
  const duplicates = (s: string) => {
    const lower = s.toLowerCase();
    if (existing.has(norm(s))) return true;
    if (existing.has(norm(s).replace(/ to practice$| early$/, ""))) return true;
    return KEY_TERMS.some((k) => lower.includes(k) && existingTitles.some((t) => t.includes(k)));
  };
  for (const s of career.strategies) {
    const type = classify(s);
    if (gradSchool && /^plan for/i.test(s)) continue; // covered by the grad-school milestones
    if (duplicates(s)) continue;
    const step: RoadmapStep = { type, title: s };
    // Dual degrees and security clearances must be planned from day one;
    // other "later" advice (grad school, fellowships) belongs in senior year.
    if (type === "milestone") (/dual-degree|clearance/i.test(s) ? y1 : y4).push(step);
    else if (type === "cert") certYears[Math.min(counts.cert++, 2)].push(step);
    else if (type === "project") projectYears[Math.min(counts.project++, 1)].push(step);
    else if (type === "experience") {
      // Internships belong in junior year; shadowing/volunteering earlier.
      (/intern|co-op|summer|externship|rotation|placement|preceptor|practicum/i.test(s) ? y3 : expYears[Math.min(counts.experience++, 1)]).push(step);
    } else classYears[Math.min(counts.class++, 1)].push({ ...step, type: "class" });
  }

  // Internship targets from the employer list.
  if (career.employers.length) {
    y3.push({ type: "experience", title: "Target internships with likely employers", detail: career.employers.slice(0, 3).join(" · "), href: HANDSHAKE_URL });
  }

  // Common launch steps.
  y2.push({ type: "milestone", title: "Write your first professional resume", detail: "Use the BizPrep resume templates and review tool.", href: "/bizprep" });
  y3.push({ type: "milestone", title: "Go to NCCU career fairs", detail: "Bring printed resumes and practice your 30-second intro.", href: "/bizprep" });

  if (track === "health") {
    y4.unshift({ type: "experience", title: "Complete your capstone internship or practicum", detail: "Treat it like a months-long job interview." });
  }
  if (track === "social") {
    y4.unshift({ type: "project", title: "Senior capstone or research project", detail: "Pick a topic connected to the work you want to do." });
  }
  y4.push({
    type: "milestone",
    title: "Update LinkedIn and connect with people in the field",
    detail: "Reach out to NCCU alumni and professionals for informational chats.",
  });
  y4.push({
    type: "milestone",
    title: gradSchool ? "Prepare for admissions interviews" : "Practice interviews",
    detail: "Ask the Career Center about mock interviews, and prepare stories about your projects and experience.",
  });

  if (gradSchool) {
    y3.push({
      type: "milestone",
      title: gradSchool.exam ? `Prepare for the ${gradSchool.exam.replace(/,.*/, "")}` : `Research ${gradSchool.school}`,
      detail: gradSchool.exam ? `Most students take it the spring or summer before applying to ${gradSchool.school}.${gradSchool.exam.includes("if") ? " Check each program's requirements." : ""}` : "Compare prerequisites, costs, and admission requirements.",
      href: gradSchool.examHref,
    });
    y3.push({ type: "milestone", title: "Ask professors for recommendation letters", detail: "Build relationships early so they can write strong, specific letters." });
    y4.push({ type: "milestone", title: `Apply to ${gradSchool.school}`, detail: "Many applications open the summer before senior year. Apply early." });
  } else if (!y4.some((st) => st.type === "milestone" && /apply|offer/i.test(st.title))) {
    y4.push({ type: "milestone", title: "Get your resume reviewed and apply", detail: "Start applying in the fall of senior year. Use Handshake and the BizPrep resume review.", href: HANDSHAKE_URL });
  }

  const aprn = track === "nursing" && /degree required/i.test(career.summary);
  const afterGraduation = gradSchool
    ? `After ${gradSchool.school}, you'll be ready to start as a ${career.title}.`
    : aprn
      ? `Work as a registered nurse for a few years, then return for the graduate degree ${career.title} requires.`
      : undefined;

  return {
    track,
    gradSchool,
    firstJob: career.trajectory[0] ?? career.title,
    afterGraduation,
    years: [
      { year: 1, label: "Freshman year", theme: "Explore and lay the foundation", steps: y1 },
      { year: 2, label: "Sophomore year", theme: "Build skills and get involved", steps: y2 },
      { year: 3, label: "Junior year", theme: "Get real-world experience", steps: y3 },
      { year: 4, label: "Senior year", theme: gradSchool ? `Apply to ${gradSchool.school}` : "Launch your career", steps: y4 },
    ],
  };
}

import { JobSimulation } from "@/lib/types";

// Forage virtual job simulations (theforage.com/simulations): free,
// self-paced tasks from real employers that end in a certificate students can
// list on a resume. Students sign in on Forage themselves (an NCCU email
// works); NetCentral only links out. Each one lists the careers it previews,
// best fit first, and a career's matches appear in file order, so U.S.
// programs come first within each section.
//
// Every career-specific simulation in the catalog is here, from any country,
// except law simulations built only for non-U.S. legal systems (UK, Australia,
// Hong Kong, and others), company overview pages and role-match quizzes, and
// high school editions. General career-skills courses are in `careerSkills`
// below and appear on every roadmap.
export const FORAGE_URL = "https://www.theforage.com/simulations";

const sim = (company: string, title: string, path: string, careerIds: string[]): JobSimulation => ({
  company,
  title,
  url: `${FORAGE_URL}/${path}`,
  careerIds,
});

export const simulations: JobSimulation[] = [
  // Banking & finance
  sim("Bank of America", "Investment Banking", "bank-of-america/investment-banking-bwp7", ["investment-analyst", "financial-analyst", "financial-modeler"]),
  sim("Goldman Sachs", "Risk", "goldman-sachs/risk-ljdz", ["quantitative-risk-analyst", "financial-analyst"]),
  sim("PGIM", "Public and Private Credit", "pgim/fixed-income-fqv9", ["investment-analyst", "financial-analyst"]),
  sim("Bank of America", "Global Markets Sales and Trading Analyst", "bank-of-america/sales-and-trading-analyst-i5jo", ["quantitative-analyst", "investment-analyst"]),
  sim("Goldman Sachs", "Internal Audit", "goldman-sachs/internal-audit-j8c6", ["auditor", "it-auditor", "compliance-officer"]),
  sim("Bank of America", "The Private Bank", "bank-of-america/private-bank-vblo", ["investment-advisor", "financial-manager"]),
  sim("Standard Chartered", "Credit Analyst", "standardchartered/banking-coverage-kr4i", ["loan-officer", "financial-analyst"]),
  sim("Fidelity International", "Investment Management", "fidelity-international/investment-management-bqoj", ["investment-advisor", "investment-analyst"]),
  sim("Goldman Sachs", "Controllers", "goldman-sachs/controllers-8npc", ["financial-controller", "management-accountant", "accountant"]),
  sim("Goldman Sachs", "Operations", "goldman-sachs/operations-9vyc", ["operations-manager", "director-of-operations"]),
  sim("PNC", "Banking at PNC: Building Career Skills", "pnc/banking-at-pnc-building-career-skills-pd92", ["loan-officer", "financial-manager"]),
  sim("PNC", "Overview of Financial Services and Banking", "pnc/overview-of-financial-services-and-banking-vzpb", ["loan-officer", "financial-manager", "financial-examiner"]),
  sim("PNC", "Key Roles and Business Segments", "pnc/key-roles-and-business-segments-0sqm", ["loan-officer", "financial-manager"]),
  sim("Vista Equity Partners", "Understanding the Deal Lifecycle", "vista-equity-partners/understanding-the-private-equity-deal-lifecycle-at-vista-equity-partners-tlv0", ["investment-analyst", "financial-modeler"]),
  sim("Vista Equity Partners", "Demystifying Private Equity", "vista-equity-partners/demystifying-private-equity-xzrs", ["investment-analyst", "financial-analyst"]),
  sim("Forage", "Excel Skills for Business Finance", "forage/sponsored-content-excel-skills-for-busi-xue7", ["financial-planning-analyst", "budget-analyst", "bookkeeper"]),
  sim("Forage", "Excel Skills", "forage/sponsored-content-excel-skills-jf8r", ["data-analyst", "accounting-assistant", "payroll-clerk", "office-manager"]),
  sim("H2 Ventures", "Venture Capital", "h2-ventures/venture-capital-comi", ["investment-analyst", "entrepreneur"]),
  sim("Commonwealth Bank", "You x CommBank", "commonwealth-bank/career-in-banking-3kh5", ["loan-officer"]),
  sim("Oliver Wyman", "Financial Services: Climate Change", "oliver-wyman/financial-services-climate-change-rv72", ["quantitative-risk-analyst", "environmental-consultant"]),
  sim("ACCA", "Sustainability in Banking", "acca-apac/sustainability-banking-4sca", ["environmental-consultant", "financial-analyst", "auditor"]),

  // Insurance
  sim("AIG", "Actuarial Analyst", "aig/actuarial-analyst-dcil", ["actuary"]),
  sim("AIG", "Underwriting", "aig/underwriting-uium", ["actuary", "quantitative-risk-analyst"]),
  sim("AIG", "Claims", "aig/claims-u9yu", ["fraud-investigator"]),
  sim("London Insurance Life", "London Market Underwriter", "london-insurance-life/london-market-underwriter-veo1", ["actuary", "quantitative-risk-analyst"]),
  sim("London Insurance Life", "London Market Claims Adjuster", "london-insurance-life/claims-adjuster-cfim", ["fraud-investigator"]),
  sim("London Insurance Life", "Operations Analyst", "london-insurance-life/operations-analyst-klxx", ["business-analyst", "operations-manager"]),
  sim("London Insurance Life", "London Market Claims Operations", "london-insurance-life/claims-operations-m6eg", ["operations-manager"]),

  // Accounting & tax
  sim("EY", "Audit", "ey/audit-k5kl", ["auditor", "certified-public-accountant", "accountant", "auditing-clerk"]),
  sim("PwC US", "Audit", "pwc-us/audit-w3fr", ["auditor", "certified-public-accountant", "accountant"]),
  sim("KPMG US", "Career Catalyst: Audit", "kpmg-us/audit-gsyv", ["auditor", "certified-public-accountant"]),
  sim("PwC US", "Tax", "pwc-us/tax-l9rj", ["tax-preparer", "certified-public-accountant"]),
  sim("KPMG US", "Career Catalyst: Tax", "kpmg-us/tax-b0hl", ["tax-preparer", "certified-public-accountant"]),
  sim("Ryan", "Property Tax Consulting", "ryan/property-tax-consulting-nowj", ["tax-preparer"]),
  sim("Ryan", "Transaction Tax Consulting", "ryan/transaction-tax-consulting-b245", ["tax-preparer", "account-manager"]),
  sim("EY", "Forensic and Integrity Services", "ey/forensics-g8l7", ["forensic-accountant", "fraud-investigator"]),
  sim("EY", "Technology Risk", "ey/technology-risk-ydqh", ["it-auditor", "it-accountant"]),
  sim("PwC US", "Digital Assurance & Transparency", "pwc-us/digital-assurance-transparency-9rtv", ["it-auditor", "it-accountant"]),
  sim("KPMG UK", "Audit", "kpmg-uk/audit-4bpf", ["auditor", "accountant"]),
  sim("KPMG in Canada", "Experience a Day with KPMG Audit & Assurance", "kpmg-ca/audit-assurance-el6n", ["auditor", "accountant"]),
  sim("PwC Switzerland", "Audit", "pwc-ch/audit-vety", ["auditor", "accountant"]),
  sim("KPMG in Canada", "Experience a Day with KPMG Tax", "kpmg-ca/tax-m4t0", ["tax-preparer", "certified-public-accountant"]),
  sim("PwC Switzerland", "Corporate Tax", "pwc-ch/corporate-tax-hmom", ["tax-preparer", "certified-public-accountant"]),
  sim("PwC Switzerland", "Digital Assurance", "pwc-ch/digital-assurance-gfnr", ["it-auditor"]),

  // Consulting & strategy
  sim("KPMG US", "Career Catalyst: Advisory", "kpmg-us/advisory-f7ke", ["management-consultant", "business-consultant"]),
  sim("BCG", "Introduction to Strategy Consulting", "bcg/intro-strategy-consulting-ubsq", ["management-consultant", "business-consultant"]),
  sim("BCG", "Strategy Consulting", "bcg/strategy-consulting-jk76", ["management-consultant"]),
  sim("PwC US", "Management Consulting", "pwc-us/management-consulting-gwcm", ["management-consultant", "business-consultant"]),
  sim("Oliver Wyman", "Integrated Consulting Group", "oliver-wyman/integrated-consulting-group-tvnj", ["management-consultant"]),
  sim("Mastercard", "Advisors & Consulting Services", "mastercard/advisors-client-services-xvlw", ["business-consultant", "business-analyst"]),
  sim("BCG", "Digital Transformation", "bcg/digital-transformation-pk18", ["it-consultant", "business-analyst"]),
  sim("PwC US", "Technology Consulting", "pwc-us/technology-consulting-fgpq", ["it-consultant", "technical-consultant"]),
  sim("BCG", "IT Architecture", "bcg/it-architect-wjf1", ["enterprise-architect", "systems-analyst"]),
  sim("BCG", "Climate & Sustainability", "bcg/climate-sustainability-irs7", ["environmental-consultant", "environmental-manager", "renewable-energy-specialist"]),
  sim("Tata", "ESG", "tata/esg-j4vw", ["environmental-consultant", "environmental-manager"]),
  sim("BCG", "BCG Vantage – Client Focus", "bcg/knowledge-team-client-focus-wqlb", ["management-consultant", "environmental-consultant"]),
  sim("BCG", "Social Impact", "bcg/social-impact-imzt", ["social-community-service-manager", "community-outreach-coordinator"]),
  sim("BCG", "Venture & Business Builds", "bcg/x-ventures-lbvf", ["entrepreneur"]),
  sim("BCG", "Teaming@BCG", "bcg/bcg-case-team-cna0", ["management-consultant", "project-manager"]),
  sim("Newton Consulting", "Making Change Stick", "newton-consulting/making-change-stick-4qwq", ["management-consultant", "operations-manager"]),
  sim("Newton Consulting", "Evidence to Impact", "newton-consulting/evidence-to-impact-5vy0", ["management-consultant", "operations-manager"]),
  sim("Newton Consulting", "From Data to Decisions", "newton-consulting/digital-and-ai-from-data-to-decisions-5jdj", ["business-analyst", "management-consultant"]),
  sim("Deloitte Australia", "Technology", "deloitte-au/technology-fz0w", ["it-consultant", "technical-consultant"]),

  // Data & AI
  sim("Tata", "GenAI Powered Data Analytics", "tata/data-analytics-t3zr", ["data-analyst", "educational-data-analyst"]),
  sim("Tata", "Data Visualisation: Empowering Business with Effective Insights", "tata/data-visualisation-p5xo", ["data-analyst", "business-analyst", "educational-data-analyst"]),
  sim("BCG", "Data Science", "bcg/data-science-ccdz", ["data-scientist", "data-analyst"]),
  sim("BCG", "Introduction to Data for Decision Makers", "bcg/data-for-decision-makers-tod0", ["business-analyst", "operations-research-analyst"]),
  sim("BCG", "GenAI", "bcg/gen-ai-anlo", ["machine-learning-engineer", "ai-research-scientist"]),
  sim("Forage", "Data Labeling", "forage/data-labeling-c1t0", ["machine-learning-engineer", "data-analyst"]),
  sim("Vista Equity Partners", "AI in Action", "vista-equity-partners/ai-in-action-cugo", ["business-analyst", "office-manager"]),
  sim("EAB", "GenAI for Proposal Generation", "eab/gen-ai-for-proposal-generation-u7cu", ["grant-writer", "educational-sales-representative"]),
  sim("British Airways", "Data Science", "british-airways/data-science-yqoz", ["data-scientist"]),
  sim("Deloitte Australia", "Data Analytics", "deloitte-au/data-analytics-s5zy", ["data-analyst"]),
  sim("Commonwealth Bank", "Introduction to Data Science", "commonwealth-bank/intro-data-science-sd7t", ["data-scientist", "data-analyst"]),
  sim("Datacom", "Automation AI Accelerator: From Co-pilot to Autonomous Agent", "datacom/automation-zn3l", ["machine-learning-engineer", "it-consultant"]),
  sim("Datacom", "Partnering with AI in the Workplace", "datacom/partnering-with-ai-in-the-workplace-khv2", ["business-analyst", "project-manager"]),

  // Software engineering & IT
  sim("Walmart", "Advanced Software Engineering", "walmart/software-engineering-fceb", ["software-developer", "algorithm-developer"]),
  sim("Hewlett Packard Enterprise", "Software Engineering", "hewlett-packard-enterprise/software-engineering-pcij", ["software-developer", "computer-programmer"]),
  sim("Y Combinator", "Working as a Software Engineer at a Start Up", "y-combinator/working-start-up-nhsg", ["software-developer", "entrepreneur"]),
  sim("Forage", "Solutions Architecture", "forage/solutions-architecture-ts4o-fg-acad", ["enterprise-architect", "systems-analyst"]),
  sim("Forage", "Product Management", "forage/product-management-5c7c-fg-acad", ["business-analyst", "product-support-manager"]),
  sim("Forage", "Mastering Technical Interviews", "forage/sponsored-content-mastering-technical-interviews-ofas", ["software-developer", "computer-programmer"]),
  sim("Commonwealth Bank", "Software Engineering", "commonwealth-bank/software-engineering-c4hw", ["software-developer", "computer-programmer"]),
  sim("Commonwealth Bank", "Introduction to Software Engineering", "commonwealth-bank/intro-software-engineering-m2ma", ["software-developer", "computer-programmer"]),
  sim("Commonwealth Bank", "Tech Explorer", "commonwealth-bank/tech-explorer-jrnj", ["software-developer", "cybersecurity-analyst", "data-analyst"]),
  sim("Blackbird", "Software Engineering", "blackbird/software-engineering-4mt9", ["software-developer"]),
  sim("Datacom", "Software Development", "datacom/software-development-l47g", ["software-developer", "computer-programmer", "systems-test-evaluation-specialist"]),
  sim("Datacom", "Service Desk", "datacom/service-desk-hoq5", ["technical-support-specialist", "systems-administrator"]),
  sim("Datacom", "Introduction to Cloud", "datacom/intro-cloud-yfvk", ["systems-administrator", "network-operations-specialist"]),
  sim("NBN Co", "Trainee Customer Field Technician", "nbnco/trainee-customer-field-technician-a9el", ["network-operations-specialist", "technical-support-specialist"]),

  // Cybersecurity
  sim("Mastercard", "Cybersecurity", "mastercard/cybersecurity-t8ye", ["cybersecurity-analyst", "threat-analyst"]),
  sim("Tata", "Cybersecurity Analyst", "tata/cybersecurity-sbda", ["cybersecurity-analyst", "systems-security-analyst", "security-control-assessor"]),
  sim("AIG", "Shields Up: Cybersecurity", "aig/cybersecurity-ku1i", ["cybersecurity-analyst", "vulnerability-assessment-analyst", "threat-analyst"]),
  sim("PwC US", "Cyber Security Consulting", "pwc-us/cybersecurity-consulting-sr1m", ["cybersecurity-program-manager", "security-control-assessor", "cybersecurity-policy-planner"]),
  sim("Datacom", "Cyber Security Operations", "datacom/cybersecurity-zm6d", ["cyber-defense-incident-responder", "defensive-cybersecurity-specialist", "network-operations-specialist"]),
  sim("Deloitte Australia", "Cyber", "deloitte-au/cyber-c1e3", ["cybersecurity-analyst", "threat-analyst"]),
  sim("Commonwealth Bank", "Introduction to Cybersecurity", "commonwealth-bank/intro-cybersecurity-rdxl", ["cybersecurity-analyst", "secure-software-assessor"]),

  // Engineering & supply chain
  sim("Johnson & Johnson", "Robotics and Controls", "johnson-and-johnson/robotics-controls-aozc", ["electronics-engineer", "engineer"]),
  sim("GE Aerospace", "Explore Electrical Engineering", "ge-aerospace/explore-electrical-engineering-ftgs", ["electronics-engineer", "engineer"]),
  sim("GE Aerospace", "Explore Engineering", "ge-aerospace/engineering-xadc", ["aerospace-engineer", "engineer", "materials-engineer"]),
  sim("LJA Engineering", "Civil Engineering", "lja/civil-engineering-np8u", ["civil-engineer"]),
  sim("LJA Engineering", "Land Surveyor", "lja/land-surveyor-rzdt", ["civil-engineer", "gis-analyst"]),
  sim("Siemens Mobility", "Operations Industrial Engineer", "siemens-mobility/operations-industrial-engineering-xh22", ["operations-manager", "engineer"]),
  sim("GE Aerospace", "Explore Manufacturing Engineering", "ge-aerospace/supply-chain-n0yr", ["supply-chain-analyst", "logistics-manager"]),
  sim("Walmart", "Associate Merchant", "walmart/associate-merchant-bgji", ["supply-chain-analyst", "pricing-analyst"]),
  sim("British Airways", "Engineering", "british-airways/engineering-y2tt", ["aerospace-engineer"]),
  sim("Engineers Without Borders UK", "Globally Responsible Engineering", "engineers-without-borders-uk/globally-responsible-engineering-qhol", ["environmental-engineer"]),

  // Project management
  sim("Siemens Mobility", "Project Manager", "siemens-mobility/project-management-qydx", ["project-manager"]),
  sim("CBRE", "Project Management", "cbre/project-management-x2vz", ["project-manager", "construction-manager"]),
  sim("Siemens Mobility", "Commercial Project Manager", "siemens-mobility/commercial-project-manager-fi6g", ["project-manager", "cost-estimator"]),

  // Business operations, HR, and real estate
  sim("Walmart", "Area Manager", "walmart/area-manager-68sx", ["operations-manager", "business-manager"]),
  sim("CBRE", "Facilities Management", "cbre/facilities-management-t1vf", ["operations-manager", "sports-facilities-manager", "conference-center-manager"]),
  sim("GE Aerospace", "Explore Human Resources", "ge-aerospace/human-resources-8hl7", ["hr-specialist", "training-development-specialist", "compensation-benefits-specialist"]),
  sim("Forage", "Introduction to Campus Recruitment", "forage/intro-campus-recruitment-arm0", ["hr-specialist", "student-affairs-professional"]),

  // Sales, marketing & customer success
  sim("Bloomberg", "Client Service", "bloomberg/client-service-l3u2", ["account-manager"]),
  sim("Bloomberg", "Client Engagement", "bloomberg/client-engagement-a6hi", ["sales-manager", "account-manager"]),
  sim("Third Bridge", "Client Service Delivery", "third-bridge/client-service-i3mi", ["account-manager", "edtech-specialist"]),
  sim("Forage", "Customer Service", "forage/sponsored-content-customer-service-hnuo", ["edtech-specialist", "guest-services-director", "front-desk-agent"]),
  sim("CBRE", "Sales", "cbre/sales-dm4r", ["sales-manager"]),
  sim("CBRE", "Commercial Real Estate", "cbre/commercial-real-estate-2wj8", ["sales-manager", "account-manager"]),
  sim("Red Bull", "On-Premise Sales", "red-bull/on-premise-sales-waza", ["sales-manager"]),
  sim("Red Bull", "Off-Premise Sales", "red-bull/off-premise-sales-wob6", ["sales-manager", "account-manager"]),
  sim("Hewlett Packard Enterprise", "Presales", "hewlett-packard-enterprise/presales-hp1a", ["technical-consultant", "product-specialist"]),
  sim("Hewlett Packard Enterprise", "Digital Sales", "hewlett-packard-enterprise/digital-sales-mmkg", ["sales-manager"]),
  sim("EAB", "Partner Development Representative", "eab/partner-development-representative-yiwt", ["educational-sales-representative"]),
  sim("Pearson", "Marketing Explorer", "pearson/marketing-oxce", ["marketing-manager", "educational-sales-representative"]),
  sim("Forage", "Omnichannel Marketing", "forage/sponsored-content-omnichannel-marketing-5iep", ["marketing-manager", "social-media-specialist"]),
  sim("Forage", "Merchandising", "forage/sponsored-content-merchandising-22kx", ["marketing-manager", "graphic-designer"]),
  sim("Forage", "Branding & Design", "forage/sponsored-content-branding-design-3w76", ["graphic-designer", "art-director", "visual-communications-specialist"]),

  // Health care & life sciences
  sim("Walmart", "Pharmacy Technician", "walmart/pharmacy-technician-hhpz", ["pharmacist"]),
  sim("Forage", "Surgical Tech", "forage/sponsored-content-surgical-tech-xgwi", ["perfusionist", "anesthesiologist-assistant", "registered-nurse"]),
  sim("Pfizer", "Molecule to Market", "pfizer-uk/molecule-market-prll", ["pharmaceutical-researcher", "regulatory-affairs-specialist", "clinical-research-associate", "pharmaceutical-sales-representative"]),
  sim("LifeArc", "Life Sciences: Biology Research", "life-arc/life-sciences-biology-research-5t8f", ["biomedical-researcher", "biotechnology-scientist"]),
  sim("LifeArc", "Chemistry", "life-arc/chemistry-w0ox", ["chemist", "process-development-scientist"]),
  sim("LifeArc", "Technology Transfer", "life-arc/technology-transfer-icij", ["patent-agent"]),
  sim("LifeArc", "Intellectual Property", "life-arc/intellectual-property-ewso", ["patent-agent", "patent-attorney"]),

  // Law (U.S.)
  sim("Morrison Foerster", "Litigation", "morrison-foerster/litigation-0hfh", ["attorney"]),
  sim("BCLP", "US Law 101", "bclp/legal-intern-er3o", ["attorney", "paralegal"]),
  sim("Mayer Brown", "Introduction to Litigation", "mayer-brown/intro-litigation-wtmm", ["paralegal", "attorney"]),
  sim("White & Case", "US Time Management and Business Communication Skills", "white-case/time-management-business-communication-moff", ["paralegal"]),
  sim("Kilpatrick", "Corporate Law", "kilpatrick/corporate-law-959a", ["attorney"]),
  sim("Latham & Watkins", "White Collar Defense & Investigations", "latham-watkins/white-collar-defense-investigations-k5wo", ["attorney", "fraud-investigator"]),
  sim("Winston Taylor", "Law School Experience", "winston-taylor/law-school-experience-pvab", ["attorney", "judge"]),
  sim("Clifford Chance", "Ready, Set, Law", "clifford-chance/ready-set-law-8vwx", ["attorney"]),
  sim("BCLP", "Commercial Disputes & Investigations", "bclp/commercial-disputes-investigations-nn6r", ["attorney", "paralegal"]),
  sim("BCLP", "Real Estate Law", "bclp/real-estate-law-d0gh", ["attorney", "paralegal"]),
  sim("White & Case", "US Antitrust", "white-case/us-antitrust-ykmz", ["attorney"]),
  sim("Latham & Watkins", "Antitrust & Competition", "latham-watkins/antitrust-competition-8rrq", ["attorney"]),
  sim("BCLP", "Antitrust and Competition", "bclp/antitrust-competition-rxow", ["attorney"]),
  sim("Linklaters", "US Commercial Law", "linklaters/commercial-law-us-xmxd", ["attorney"]),
  sim("Linklaters", "Legal Foundations", "linklaters/legal-foundations-uk-qdfx", ["attorney", "paralegal"]),
  sim("Linklaters", "Introduction to Business Teams", "linklaters/intro-business-teams-uk-1q7y", ["office-manager", "paralegal"]),
  sim("White & Case", "US Cross-Border Transactions", "white-case/us-cross-border-transactions-imzz", ["attorney"]),
  sim("White & Case", "US Trade Law", "white-case/us-trade-law-k3ov", ["attorney", "policy-analyst"]),
  sim("Clifford Chance", "Business and Human Rights", "clifford-chance/business-human-rights-pgz5", ["attorney", "policy-analyst"]),
  sim("Clifford Chance", "Climate Change", "clifford-chance/climate-change-fbbd", ["attorney", "environmental-lobbyist"]),
  sim("Morrison Foerster", "M&A", "morrison-foerster/m-a-na5d", ["attorney"]),
  sim("Latham & Watkins", "Mergers & Acquisitions", "latham-watkins/mergers-acquisitions-a3qk", ["attorney"]),
  sim("Mayer Brown", "Mergers & Acquisitions", "mayer-brown/mergers-acquisitions-new6", ["attorney"]),
  sim("Goodwin", "Private Equity M&A", "goodwin/private-equity-m-a-pilq", ["attorney"]),
  sim("BCLP", "Private Equity and Mergers & Acquisitions (M&A)", "bclp/private-equity-mergers-acquisitions-a29d", ["attorney"]),
  sim("DLA Piper", "Mergers and Acquisitions for AI Innovation", "dla-piper/m-a-for-ai-innovation-uhyb", ["attorney"]),
  sim("Goodwin", "Early Stage Financing", "goodwin/early-stage-financing-62v2", ["attorney", "entrepreneur"]),
  sim("Latham & Watkins", "Emerging Companies", "latham-watkins/emerging-companies-h5do", ["attorney", "entrepreneur"]),
  sim("White & Case", "US Capital Markets", "white-case/capital-markets-uw9s", ["attorney"]),
  sim("Latham & Watkins", "Capital Markets", "latham-watkins/capital-markets-qn3h", ["attorney"]),
  sim("Freshfields", "US Capital Markets", "freshfields/us-capital-markets-kes8", ["attorney"]),
  sim("White & Case", "US Debt Finance", "white-case/us-debt-finance-8lst", ["attorney"]),
  sim("Latham & Watkins", "Banking", "latham-watkins/banking-shrf", ["attorney"]),
  sim("Latham & Watkins", "Restructuring", "latham-watkins/restructuring-tdwc", ["attorney"]),
  sim("BCLP", "Real Estate Finance", "bclp/real-estate-finance-gpnr", ["attorney"]),
  sim("Clifford Chance", "Financing the Real Economy", "clifford-chance/sabre-finance-zn3t", ["attorney"]),
  sim("Mayer Brown", "Financing Renewable Energy Projects", "mayer-brown/financing-renewable-energy-projects-vzzu", ["attorney", "renewable-energy-specialist"]),
  sim("Clifford Chance", "Risk and Resilience", "clifford-chance/risk-resilience-pt75", ["attorney"]),
  sim("Goodwin", "Life Sciences Litigation", "goodwin/life-sciences-litigation-eyua", ["attorney", "patent-attorney"]),
  sim("Kilpatrick", "Patent Law", "kilpatrick/patent-law-u2wg", ["patent-attorney", "patent-agent"]),
  sim("Morrison Foerster", "Patent Strategy & Prosecution", "morrison-foerster/patent-strategy-prosecution-cfge", ["patent-attorney", "patent-agent"]),
  sim("Latham & Watkins", "Intellectual Property Litigation", "latham-watkins/intellectual-property-litigation-s9pf", ["patent-attorney"]),
  sim("White & Case", "US Intellectual Property", "white-case/us-intellectual-property-wy5o", ["patent-attorney", "attorney"]),
  sim("Latham & Watkins", "Data and Technology Transactions", "latham-watkins/data-and-technology-transactions-8N", ["privacy-officer", "attorney"]),
  sim("Clifford Chance", "Cyber Security", "clifford-chance/cybersecurity-sjiw", ["cybersecurity-legal-advisor", "privacy-officer"]),
  sim("DLA Piper", "Global Cyber with Data Privacy", "dla-piper/global-cyber-with-data-privacy-obq6", ["privacy-officer", "cybersecurity-legal-advisor"]),
];

// General career-skills courses on Forage that help in any field, placed in
// the year each one is most useful. They appear on every roadmap.
export const careerSkills: { year: 1 | 2 | 3 | 4; sim: JobSimulation }[] = [
  { year: 1, sim: sim("National Urban League", "Career Readiness", "national-urban-league/career-readiness-nhwo", []) },
  { year: 2, sim: sim("Forage", "Resume Writing with AI Support", "learning/resume-writing-ai-i71n", []) },
  { year: 3, sim: sim("PNC", "Professionalism & Power Skills", "pnc/professionalism-power-skills-dxef", []) },
  { year: 4, sim: sim("Comcast", "Unspoken Interview Fundamentals", "comcast/interview-fundamentals-3j7g", []) },
];

export function simulationsFor(careerId: string): JobSimulation[] {
  return simulations.filter((s) => s.careerIds.includes(careerId));
}

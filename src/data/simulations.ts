import { JobSimulation } from "@/lib/types";

// Forage virtual job simulations (theforage.com/simulations): free,
// self-paced tasks from real employers that end in a certificate students can
// list on a resume. Students sign in on Forage themselves (an NCCU email
// works); NetCentral only links out. Each one lists the careers it previews,
// best fit first. Left out: simulations for UK, Australian, Hong Kong, and
// other non-US legal systems, high school editions, and general career
// skills courses (interviewing, Excel) that don't preview a specific career.
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
  sim("PNC", "Banking at PNC: Building Career Skills", "pnc/banking-at-pnc-building-career-skills-pd92", ["loan-officer"]),
  sim("Vista Equity Partners", "Understanding the Deal Lifecycle", "vista-equity-partners/understanding-the-private-equity-deal-lifecycle-at-vista-equity-partners-tlv0", ["investment-analyst", "financial-modeler"]),
  sim("Forage", "Excel Skills for Business Finance", "forage/sponsored-content-excel-skills-for-busi-xue7", ["financial-planning-analyst", "budget-analyst", "bookkeeper"]),

  // Insurance
  sim("AIG", "Actuarial Analyst", "aig/actuarial-analyst-dcil", ["actuary"]),
  sim("AIG", "Underwriting", "aig/underwriting-uium", ["actuary", "quantitative-risk-analyst"]),

  // Accounting & tax
  sim("EY", "Audit", "ey/audit-k5kl", ["auditor", "certified-public-accountant", "accountant", "auditing-clerk"]),
  sim("PwC US", "Audit", "pwc-us/audit-w3fr", ["auditor", "certified-public-accountant", "accountant"]),
  sim("KPMG US", "Career Catalyst: Audit", "kpmg-us/audit-gsyv", ["auditor", "certified-public-accountant"]),
  sim("PwC US", "Tax", "pwc-us/tax-l9rj", ["tax-preparer", "certified-public-accountant"]),
  sim("KPMG US", "Career Catalyst: Tax", "kpmg-us/tax-b0hl", ["tax-preparer", "certified-public-accountant"]),
  sim("Ryan", "Property Tax Consulting", "ryan/property-tax-consulting-nowj", ["tax-preparer"]),
  sim("EY", "Forensic and Integrity Services", "ey/forensics-g8l7", ["forensic-accountant", "fraud-investigator"]),
  sim("EY", "Technology Risk", "ey/technology-risk-ydqh", ["it-auditor", "it-accountant"]),
  sim("PwC US", "Digital Assurance & Transparency", "pwc-us/digital-assurance-transparency-9rtv", ["it-auditor", "it-accountant"]),

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
  sim("BCG", "Social Impact", "bcg/social-impact-imzt", ["social-community-service-manager", "community-outreach-coordinator"]),
  sim("BCG", "Venture & Business Builds", "bcg/x-ventures-lbvf", ["entrepreneur"]),

  // Data & AI
  sim("Tata", "GenAI Powered Data Analytics", "tata/data-analytics-t3zr", ["data-analyst", "educational-data-analyst"]),
  sim("Tata", "Data Visualisation: Empowering Business with Effective Insights", "tata/data-visualisation-p5xo", ["data-analyst", "business-analyst", "educational-data-analyst"]),
  sim("BCG", "Data Science", "bcg/data-science-ccdz", ["data-scientist", "data-analyst"]),
  sim("BCG", "Introduction to Data for Decision Makers", "bcg/data-for-decision-makers-tod0", ["business-analyst", "operations-research-analyst"]),
  sim("BCG", "GenAI", "bcg/gen-ai-anlo", ["machine-learning-engineer", "ai-research-scientist"]),

  // Software engineering & IT
  sim("Walmart", "Software Engineering", "walmart/software-engineering-fceb", ["software-developer", "algorithm-developer"]),
  sim("Hewlett Packard Enterprise", "Software Engineering", "hewlett-packard-enterprise/software-engineering-pcij", ["software-developer", "computer-programmer"]),
  sim("Y Combinator", "Working as a Software Engineer at a Start Up", "y-combinator/working-start-up-nhsg", ["software-developer", "entrepreneur"]),
  sim("Forage", "Solutions Architecture", "forage/solutions-architecture-ts4o-fg-acad", ["enterprise-architect", "systems-analyst"]),
  sim("Forage", "Product Management", "forage/product-management-5c7c-fg-acad", ["business-analyst", "product-support-manager"]),
  sim("Datacom", "Service Desk", "datacom/service-desk-hoq5", ["technical-support-specialist", "systems-administrator"]),
  sim("Datacom", "Introduction to Cloud", "datacom/intro-cloud-yfvk", ["systems-administrator", "network-operations-specialist"]),

  // Cybersecurity
  sim("Mastercard", "Cybersecurity", "mastercard/cybersecurity-t8ye", ["cybersecurity-analyst", "threat-analyst"]),
  sim("Tata", "Cybersecurity Analyst", "tata/cybersecurity-sbda", ["cybersecurity-analyst", "systems-security-analyst", "security-control-assessor"]),
  sim("AIG", "Shields Up: Cybersecurity", "aig/cybersecurity-ku1i", ["cybersecurity-analyst", "vulnerability-assessment-analyst", "threat-analyst"]),
  sim("PwC US", "Cyber Security Consulting", "pwc-us/cybersecurity-consulting-sr1m", ["cybersecurity-program-manager", "security-control-assessor", "cybersecurity-policy-planner"]),
  sim("Datacom", "Cyber Security Operations", "datacom/cybersecurity-zm6d", ["cyber-defense-incident-responder", "defensive-cybersecurity-specialist", "network-operations-specialist"]),

  // Engineering & supply chain
  sim("Johnson & Johnson", "Robotics and Controls", "johnson-and-johnson/robotics-controls-aozc", ["electronics-engineer", "engineer"]),
  sim("GE Aerospace", "Explore Electrical Engineering", "ge-aerospace/explore-electrical-engineering-ftgs", ["electronics-engineer", "engineer"]),
  sim("GE Aerospace", "Explore Engineering", "ge-aerospace/engineering-xadc", ["aerospace-engineer", "engineer", "materials-engineer"]),
  sim("British Airways", "Engineering", "british-airways/engineering-y2tt", ["aerospace-engineer"]),
  sim("LJA Engineering", "Civil Engineering", "lja/civil-engineering-np8u", ["civil-engineer"]),
  sim("LJA Engineering", "Land Surveyor", "lja/land-surveyor-rzdt", ["civil-engineer", "gis-analyst"]),
  sim("Engineers Without Borders UK", "Globally Responsible Engineering", "engineers-without-borders-uk/globally-responsible-engineering-qhol", ["environmental-engineer"]),
  sim("Siemens Mobility", "Operations Industrial Engineer", "siemens-mobility/operations-industrial-engineering-xh22", ["operations-manager", "engineer"]),
  sim("GE Aerospace", "Explore Manufacturing Engineering", "ge-aerospace/supply-chain-n0yr", ["supply-chain-analyst", "logistics-manager"]),
  sim("Walmart", "Associate Merchant", "walmart/associate-merchant-bgji", ["supply-chain-analyst", "pricing-analyst"]),

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
  sim("Red Bull", "On-Premise Sales", "red-bull/on-premise-sales-waza", ["sales-manager"]),
  sim("Hewlett Packard Enterprise", "Presales", "hewlett-packard-enterprise/presales-hp1a", ["technical-consultant", "product-specialist"]),
  sim("Hewlett Packard Enterprise", "Digital Sales", "hewlett-packard-enterprise/digital-sales-mmkg", ["sales-manager"]),
  sim("EAB", "Partner Development Representative", "eab/partner-development-representative-yiwt", ["educational-sales-representative"]),
  sim("Pearson", "Marketing Explorer", "pearson/marketing-oxce", ["marketing-manager", "educational-sales-representative"]),
  sim("Forage", "Omnichannel Marketing", "forage/sponsored-content-omnichannel-marketing-5iep", ["marketing-manager", "social-media-specialist"]),
  sim("Forage", "Branding & Design", "forage/sponsored-content-branding-design-3w76", ["graphic-designer", "art-director", "visual-communications-specialist"]),

  // Health care & life sciences
  sim("Walmart", "Pharmacy Technician", "walmart/pharmacy-technician-hhpz", ["pharmacist"]),
  sim("Pfizer", "Molecule to Market", "pfizer-uk/molecule-market-prll", ["pharmaceutical-researcher", "regulatory-affairs-specialist", "clinical-research-associate"]),
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
  sim("Kilpatrick", "Patent Law", "kilpatrick/patent-law-u2wg", ["patent-attorney", "patent-agent"]),
  sim("Morrison Foerster", "Patent Strategy & Prosecution", "morrison-foerster/patent-strategy-prosecution-cfge", ["patent-attorney", "patent-agent"]),
  sim("Latham & Watkins", "Intellectual Property Litigation", "latham-watkins/intellectual-property-litigation-s9pf", ["patent-attorney"]),
  sim("DLA Piper", "Global Cyber with Data Privacy", "dla-piper/global-cyber-with-data-privacy-obq6", ["privacy-officer", "cybersecurity-legal-advisor"]),
  sim("Clifford Chance", "Cyber Security", "clifford-chance/cybersecurity-sjiw", ["cybersecurity-legal-advisor"]),
];

export function simulationsFor(careerId: string): JobSimulation[] {
  return simulations.filter((s) => s.careerIds.includes(careerId));
}

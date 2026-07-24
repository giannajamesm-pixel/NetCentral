import { QuizQuestion } from "@/lib/types";

export const quizQuestions: QuizQuestion[] = [
  // Personality
  {
    id: "p1",
    section: "Personality",
    prompt:
      "A group project just got assigned with total creative freedom on how to approach it. What's your instinct?",
    type: "single",
    options: [
      { id: "p1-1", label: "Research the underlying problem before anyone else starts", weights: { I: 2 } },
      { id: "p1-2", label: "Sketch out something bold and original", weights: { A: 2 } },
      { id: "p1-3", label: "Get the team aligned and assign roles so we move fast", weights: { E: 2 } },
      { id: "p1-4", label: "Build a clear step-by-step plan and checklist", weights: { C: 2 } },
      { id: "p1-5", label: "Start prototyping something with your hands or a tool", weights: { R: 2 } },
    ],
  },
  {
    id: "p2",
    section: "Personality",
    prompt: "Your friends would describe you as the person who...",
    type: "single",
    options: [
      { id: "p2-1", label: "Always knows how to make someone feel better", weights: { S: 2 } },
      { id: "p2-2", label: "Can fix or build almost anything", weights: { R: 2 } },
      { id: "p2-3", label: "Notices details everyone else misses", weights: { C: 2 } },
      { id: "p2-4", label: "Has a new idea every five minutes", weights: { A: 2 } },
      { id: "p2-5", label: "Convinces people to try things they were unsure about", weights: { E: 2 } },
    ],
  },
  {
    id: "p3",
    section: "Personality",
    prompt: "Pick the environment you'd feel most 'in the zone' in:",
    type: "single",
    options: [
      { id: "p3-1", label: "A workshop, lab, or job site working with your hands", weights: { R: 2 } },
      { id: "p3-2", label: "A quiet space digging into data or a hard problem", weights: { I: 2 } },
      { id: "p3-3", label: "A studio, stage, or blank page creating something", weights: { A: 2 } },
      { id: "p3-4", label: "A room full of people you're helping or teaching", weights: { S: 2 } },
      { id: "p3-5", label: "A pitch meeting or negotiation where stakes are high", weights: { E: 2 } },
    ],
  },

  // Hobbies & Interests
  {
    id: "h1",
    section: "Hobbies & Interests",
    prompt: "Which of these do you actually enjoy doing in your free time?",
    helper: "Pick up to 5.",
    type: "multi",
    maxSelect: 5,
    options: [
      { id: "h1-1", label: "Gaming / game design", weights: { I: 1, A: 1 }, interestTags: ["technology", "design"] },
      { id: "h1-2", label: "Writing (stories, blogs, poetry)", weights: { A: 1 }, interestTags: ["writing"] },
      { id: "h1-3", label: "Sports / fitness", weights: { R: 1 }, interestTags: ["movement"] },
      { id: "h1-4", label: "Building or fixing things", weights: { R: 2 }, interestTags: ["building"] },
      { id: "h1-5", label: "Volunteering / community work", weights: { S: 2 }, interestTags: ["people"] },
      { id: "h1-6", label: "Investing / following markets", weights: { E: 1, C: 1 }, interestTags: ["business"] },
      { id: "h1-7", label: "Art, music, or design", weights: { A: 2 }, interestTags: ["design"] },
      { id: "h1-8", label: "Coding or tech projects", weights: { I: 2 }, interestTags: ["technology"] },
      { id: "h1-9", label: "Debate, mock trial, or public speaking", weights: { E: 1, S: 1 }, interestTags: ["communication"] },
      { id: "h1-10", label: "Science experiments / nature exploration", weights: { I: 2 }, interestTags: ["science"] },
      { id: "h1-11", label: "Organizing events or leading clubs", weights: { E: 2 }, interestTags: ["leadership"] },
      { id: "h1-12", label: "Reading / research rabbit holes", weights: { I: 1, C: 1 }, interestTags: ["research"] },
    ],
  },

  // Academic Strengths
  {
    id: "a1",
    section: "Academic Strengths",
    prompt: "Which subjects have you consistently done well in or enjoyed?",
    helper: "Pick up to 4.",
    type: "multi",
    maxSelect: 4,
    options: [
      { id: "a1-1", label: "Math", weights: { I: 1, C: 1 }, interestTags: ["numbers"] },
      { id: "a1-2", label: "Science / Biology / Chemistry", weights: { I: 2 }, interestTags: ["science"] },
      { id: "a1-3", label: "English / Writing", weights: { A: 1 }, interestTags: ["writing"] },
      { id: "a1-4", label: "History / Social Studies", weights: { S: 1, A: 1 }, interestTags: ["people"] },
      { id: "a1-5", label: "Computer Science", weights: { I: 2 }, interestTags: ["technology"] },
      { id: "a1-6", label: "Art / Music / Theater", weights: { A: 2 }, interestTags: ["design"] },
      { id: "a1-7", label: "Business / Economics", weights: { E: 2 }, interestTags: ["business"] },
      { id: "a1-8", label: "Foreign Languages", weights: { S: 1, A: 1 }, interestTags: ["languages"] },
      { id: "a1-9", label: "Psychology / Sociology", weights: { S: 2 }, interestTags: ["people"] },
    ],
  },

  // Family & Values
  {
    id: "v1",
    section: "Family & Values",
    prompt: "When your family talks about your future career, what matters most to them?",
    helper: "Pick up to 3.",
    type: "multi",
    maxSelect: 3,
    weightMultiplier: 1,
    options: [
      { id: "v1-1", label: "Financial stability / a reliable paycheck", valueTags: ["stability"] },
      { id: "v1-2", label: "Making good money / high earning potential", valueTags: ["income"] },
      { id: "v1-3", label: "Prestige — a career people respect", valueTags: ["prestige"] },
      { id: "v1-4", label: "Helping others or giving back", valueTags: ["helping"] },
      { id: "v1-5", label: "Flexibility to balance family and life", valueTags: ["flexibility"] },
      { id: "v1-6", label: "That you follow what makes you happy", valueTags: ["creativity"] },
    ],
  },
  {
    id: "v2",
    section: "Family & Values",
    prompt: "What matters most to YOU, honestly?",
    helper: "Pick up to 3.",
    type: "multi",
    maxSelect: 3,
    weightMultiplier: 2,
    options: [
      { id: "v2-1", label: "Financial stability / a reliable paycheck", valueTags: ["stability"] },
      { id: "v2-2", label: "Making good money / high earning potential", valueTags: ["income"] },
      { id: "v2-3", label: "Prestige — a career people respect", valueTags: ["prestige"] },
      { id: "v2-4", label: "Helping others or giving back", valueTags: ["helping"] },
      { id: "v2-5", label: "Flexibility to balance family and life", valueTags: ["flexibility"] },
      { id: "v2-6", label: "Creative freedom and self-expression", valueTags: ["creativity"] },
    ],
  },

  // Work Style
  {
    id: "w1",
    section: "Work Style",
    prompt: "Structured or flexible?",
    type: "single",
    options: [
      { id: "w1-1", label: "I like clear structure, rules, and expectations", weights: { C: 2 } },
      { id: "w1-2", label: "I like flexibility and figuring it out as I go", weights: { A: 1, E: 1 } },
    ],
  },
  {
    id: "w2",
    section: "Work Style",
    prompt: "Solo or team?",
    type: "single",
    options: [
      { id: "w2-1", label: "I do my best work independently", weights: { I: 2 } },
      { id: "w2-2", label: "I do my best work collaborating with others", weights: { S: 1, E: 1 } },
    ],
  },
  {
    id: "w3",
    section: "Work Style",
    prompt: "Hands-on or screen-based?",
    type: "single",
    options: [
      { id: "w3-1", label: "Hands-on and physical, often outdoors or in the field", weights: { R: 2 } },
      { id: "w3-2", label: "Screen-based and indoors, at a desk", weights: { I: 1, C: 1 } },
    ],
  },
];

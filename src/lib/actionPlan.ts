import { careers } from "@/data/careers";
import { majors } from "@/data/majors";
import { buildRoadmap } from "@/lib/roadmap";
import { collegeYear, CollegeYear, preparationHref } from "@/lib/studentPath";

export type PlanFocus = "experience" | "skills" | "applications";
export interface PlanRequest { careerId: string; majorId: string; year: CollegeYear; hours: 2 | 5 | 10; focus: PlanFocus }
export interface PlanResource { id: string; name: string; href: string }
export interface ActionPlan {
  summary: string;
  weeks: { week: number; goal: string; action: string; evidence: string; resourceId: string }[];
}

export function validatePlanRequest(value: unknown): PlanRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const year = collegeYear(v.year);
  if (typeof v.year !== "number" || !year || ![2, 5, 10].includes(v.hours as number) ||
      !["experience", "skills", "applications"].includes(v.focus as string) ||
      typeof v.careerId !== "string" || typeof v.majorId !== "string") return null;
  const career = careers.find((entry) => entry.id === v.careerId);
  if (!career || !career.majorIds.includes(v.majorId)) return null;
  return { careerId: career.id, majorId: v.majorId, year, hours: v.hours as PlanRequest["hours"], focus: v.focus as PlanFocus };
}

export function actionPlanContext(request: PlanRequest) {
  const career = careers.find((entry) => entry.id === request.careerId)!;
  const major = majors.find((entry) => entry.id === request.majorId)!;
  const year = buildRoadmap(career, major).years.find((entry) => entry.year === request.year)!;
  const resources: PlanResource[] = [{ id: "prepare", name: "NetCentral application toolkit", href: preparationHref(major.id, career.id, request.year) }];
  for (const step of year.steps) {
    if (!step.href) continue;
    const href = step.href === "/bizprep" ? preparationHref(major.id, career.id, request.year) : step.href;
    if (!resources.some((r) => r.href === href)) resources.push({ id: `resource-${resources.length}`, name: step.title, href });
  }
  for (const resource of career.resources?.slice(0, 3) ?? []) {
    if (!resources.some((r) => r.href === resource.url)) resources.push({ id: `resource-${resources.length}`, name: resource.name, href: resource.url });
  }
  return { career: career.title, major: major.name, year: request.year, hoursPerWeek: request.hours, focus: request.focus,
    skills: career.skills, yearPriorities: year.steps.map(({ title, detail }) => ({ title, detail })), resources };
}

export function validateActionPlan(value: unknown, resources: PlanResource[]): ActionPlan | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const text = (s: unknown, max: number): s is string => typeof s === "string" && s.trim().length > 0 && s.length <= max;
  if (!text(v.summary, 600) || !Array.isArray(v.weeks) || v.weeks.length !== 4) return null;
  const ids = new Set(["none", ...resources.map((r) => r.id)]);
  const weeks: ActionPlan["weeks"] = [];
  for (let i = 0; i < 4; i++) {
    const w = v.weeks[i];
    if (!w || typeof w !== "object" || w.week !== i + 1 || !text(w.goal, 180) || !text(w.action, 650) ||
        !text(w.evidence, 250) || typeof w.resourceId !== "string" || !ids.has(w.resourceId)) return null;
    weeks.push({ week: i + 1, goal: w.goal, action: w.action, evidence: w.evidence, resourceId: w.resourceId });
  }
  return { summary: v.summary, weeks };
}

export function planSchema(resources: PlanResource[]) {
  return { type: "object", additionalProperties: false, required: ["summary", "weeks"], properties: {
    summary: { type: "string" }, weeks: { type: "array", items: { type: "object", additionalProperties: false,
      required: ["week", "goal", "action", "evidence", "resourceId"], properties: {
        week: { type: "integer", enum: [1, 2, 3, 4] }, goal: { type: "string" }, action: { type: "string" },
        evidence: { type: "string" }, resourceId: { type: "string", enum: ["none", ...resources.map((r) => r.id)] },
      } } },
  } };
}

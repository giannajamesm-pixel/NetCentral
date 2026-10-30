export type CollegeYear = 1 | 2 | 3 | 4;

export interface StudentPath {
  version: 1;
  careerId: string;
  careerTitle: string;
  majorId: string;
  majorName: string;
  year: CollegeYear;
  completed: string[];
}

export function collegeYear(value: unknown): CollegeYear | undefined {
  const n = typeof value === "string" && /^[1-4]$/.test(value) ? Number(value) : value;
  return n === 1 || n === 2 || n === 3 || n === 4 ? n : undefined;
}

export function parseStudentPath(raw: string | null): StudentPath | null {
  if (!raw || raw.length > 8000) return null;
  try {
    const v = JSON.parse(raw);
    const year = collegeYear(v?.year);
    const slug = (s: unknown) => typeof s === "string" && /^[a-z0-9-]{1,100}$/.test(s);
    const name = (s: unknown) => typeof s === "string" && s.length > 0 && s.length <= 160;
    if (v?.version !== 1 || !slug(v.careerId) || !slug(v.majorId) ||
        !name(v.careerTitle) || !name(v.majorName) || !year ||
        !Array.isArray(v.completed) || v.completed.length > 40 ||
        !v.completed.every((id: unknown) => typeof id === "string" && /^[1-4]:\d{1,2}$/.test(id))) return null;
    return { version: 1, careerId: v.careerId, careerTitle: v.careerTitle,
      majorId: v.majorId, majorName: v.majorName, year, completed: [...new Set<string>(v.completed)] };
  } catch { return null; }
}

export function pathQuery(majorId: string, careerId?: string, year?: CollegeYear) {
  const q = new URLSearchParams({ major: majorId });
  if (careerId) q.set("career", careerId);
  if (year) q.set("year", String(year));
  return q.toString();
}

export function roadmapHref(majorId: string, careerId: string, year?: CollegeYear) {
  return `/explore/${encodeURIComponent(careerId)}?${pathQuery(majorId, undefined, year)}`;
}

export function preparationHref(majorId: string, careerId: string, year?: CollegeYear) {
  return `/bizprep?${pathQuery(majorId, careerId, year)}`;
}

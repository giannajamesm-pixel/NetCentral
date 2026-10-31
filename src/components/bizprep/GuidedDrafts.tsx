"use client";

import { useState } from "react";

type Props = { kind: "cover-letter" | "portfolio"; careerTitle?: string };
const input = "mt-2 block min-h-11 w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 focus:outline-2 focus:outline-primary-600";

export default function GuidedDrafts({ kind, careerTitle }: Props) {
  const [role, setRole] = useState(careerTitle ?? "");
  const [company, setCompany] = useState("");
  const [example, setExample] = useState("");
  const [interest, setInterest] = useState("");
  const [draft, setDraft] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [message, setMessage] = useState("");
  const isLetter = kind === "cover-letter";

  function generate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!role.trim() || !example.trim() || (isLetter && !company.trim())) return;
    setDraft(isLetter ? ["Dear Hiring Team,", `I am applying for the ${role.trim()} position at ${company.trim()}. ${interest.trim()}`.trim(),
      example.trim(), `I would welcome the opportunity to discuss how I could contribute as a ${role.trim()}. Thank you for your consideration.`, "Sincerely,", "[Add your name]"].join("\n\n") :
      [`Portfolio: ${role.trim()}`, "About me\n[Write two sentences about your interests and the work you want to do.]",
        `Featured work\n${example.trim()}`, "For each project\nThe problem\nYour own contribution\nTools and skills\nOutcome or what you learned\nLink or image you have permission to share",
        interest.trim() ? `What I want to develop next\n${interest.trim()}` : "What I want to develop next\n[Choose one skill or project to work on next.]",
        "Contact\n[Choose which professional contact details to share.]"].join("\n\n"));
    setHasDraft(true);
    setMessage("Your editable draft is ready below.");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setMessage("Draft copied."); }
    catch { setMessage("Copy is unavailable. Select the draft text to copy it manually."); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = isLetter ? "NetCentral-cover-letter.txt" : "NetCentral-portfolio-outline.txt"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div>
      <h3 className="font-display text-xl font-bold">{isLetter ? "Build a cover letter draft" : "Build your portfolio outline"}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{isLetter ? "Start with a real example of your work, then edit the draft for the position." : "Organize work you can show and explain. Class projects, volunteer work, and personal projects all count."} These guided tools run in your browser.</p>
      <form onSubmit={generate} className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Target role<input required maxLength={120} value={role} onChange={(e) => setRole(e.target.value)} className={input} /></label>
        {isLetter && <label className="text-sm font-semibold">Company<input required maxLength={120} value={company} onChange={(e) => setCompany(e.target.value)} className={input} /></label>}
        <label className="text-sm font-semibold sm:col-span-2">{isLetter ? "A relevant project, skill, or experience" : "One or two projects you want to feature"}<textarea required maxLength={1800} rows={3} value={example} onChange={(e) => setExample(e.target.value)} placeholder="Describe what you actually did and what you learned or achieved." className={input} /></label>
        <label className="text-sm font-semibold sm:col-span-2">{isLetter ? "Why this company or role interests you" : "A skill or type of work you want to develop next"} <span className="font-normal text-ink-500">(optional)</span><textarea maxLength={800} rows={2} value={interest} onChange={(e) => setInterest(e.target.value)} className={input} /></label>
        <div className="sm:col-span-2"><button className="min-h-11 rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600">{isLetter ? "Create my draft" : "Create my outline"}</button></div>
      </form>
      {hasDraft && <div className="mt-6 border-t border-ink-100 pt-6">
        <label className="text-sm font-semibold">Edit your {isLetter ? "cover letter" : "outline"}<textarea rows={14} value={draft} onChange={(e) => setDraft(e.target.value)} className={input} /></label>
        <p className="mt-2 text-xs text-ink-500">Check every statement and replace bracketed prompts before sharing. This is a guided template, not AI-generated advice.</p>
        <div className="mt-3 flex flex-wrap gap-3"><button onClick={copy} className="min-h-11 rounded-lg border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">Copy draft</button><button onClick={download} className="min-h-11 rounded-lg border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">Download text</button></div>
      </div>}
      <p role="status" className="mt-3 text-sm text-primary-700">{message}</p>
    </div>
  );
}

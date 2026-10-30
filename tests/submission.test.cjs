const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Run the existing TypeScript source without installing another test runtime.
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  return resolve.call(this, request.startsWith("@/") ? path.join(__dirname, "../src", request.slice(2)) : request, ...rest);
};
require.extensions[".ts"] = function (module, filename) {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};

const { collegeYear, parseStudentPath, roadmapHref, preparationHref } = require("../src/lib/studentPath.ts");
const { validatePlanRequest, actionPlanContext, validateActionPlan } = require("../src/lib/actionPlan.ts");
const { POST } = require("../src/app/api/action-plan/route.ts");
const input = { careerId: "sound-engineering-technician", majorId: "music", year: 2, hours: 5, focus: "skills" };
const saved = { version: 1, careerId: input.careerId, careerTitle: "Sound Engineering Technician", majorId: "music", majorName: "Music", year: 2, completed: ["2:0"] };
const plan = () => ({ summary: "Build a small audio project alongside coursework.", weeks: [1,2,3,4].map(week => ({ week, goal: "Practice recording", action: "Record and review an original short sample.", evidence: "A sample and a note about what changed.", resourceId: "none" })) });

test("saved progress restores the selected year and stays on internal routes", () => {
  assert.equal(parseStudentPath(JSON.stringify(saved)).year, 2);
  assert.equal(roadmapHref("music", input.careerId, 2), "/explore/sound-engineering-technician?major=music&year=2");
  assert.equal(preparationHref("music", input.careerId, 2), "/bizprep?major=music&career=sound-engineering-technician&year=2");
});

test("corrupt browser data cannot create external links or invalid year state", () => {
  for (const value of [null, "{bad", JSON.stringify({...saved, careerId:"https://example.com"}), JSON.stringify({...saved, year:0}), JSON.stringify({...saved, completed:["malformed"]}), "x".repeat(8001)]) assert.equal(parseStudentPath(value), null);
  assert.equal(collegeYear("2"),2);
  assert.equal(collegeYear(["2"]),undefined);
  assert.equal(collegeYear("2.0"),undefined);
});

test("the AI plan requires a real career-major pairing and bounded options", () => {
  assert.deepEqual(validatePlanRequest(input),input);
  for (const bad of [{...input,majorId:"accounting"},{...input,careerId:"invented-role"},{...input,year:"2"},{...input,hours:100},{...input,focus:"unknown"}]) assert.equal(validatePlanRequest(bad),null);
  const context=actionPlanContext(input);
  assert.equal(context.year,2);
  assert.equal(context.career,"Sound Engineering Technician");
  assert.ok(context.resources.some(r=>r.href.includes("career=sound-engineering-technician&year=2")));
});

test("AI output must have all four weeks and only known resource identifiers", () => {
  const context=actionPlanContext(input);
  assert.ok(validateActionPlan(plan(),context.resources));
  const unknown=plan();unknown.weeks[0].resourceId="https://invented.example";
  assert.equal(validateActionPlan(unknown,context.resources),null);
  const duplicate=plan();duplicate.weeks[1].week=1;
  assert.equal(validateActionPlan(duplicate,context.resources),null);
  const incomplete=plan();incomplete.weeks.pop();
  assert.equal(validateActionPlan(incomplete,context.resources),null);
});

test("API is off by default and makes no provider call; enabled requests need consent", async () => {
  const original={enabled:process.env.NETCENTRAL_AI_ENABLED,key:process.env.OPENAI_API_KEY,model:process.env.NETCENTRAL_AI_MODEL,fetch:global.fetch};
  let calls=0;global.fetch=async()=>{calls++;throw new Error("Unexpected network");};
  const request=(body,origin="https://net-central.vercel.app")=>new Request("https://net-central.vercel.app/api/action-plan", {method:"POST",headers:{origin,"Content-Type":"application/json"},body:JSON.stringify(body)});
  try {
    delete process.env.NETCENTRAL_AI_ENABLED;
    assert.equal((await POST(request({...input,consent:true}))).status,503);
    process.env.NETCENTRAL_AI_ENABLED="true";process.env.OPENAI_API_KEY="test-only-fake-key";process.env.NETCENTRAL_AI_MODEL="test-model";
    assert.equal((await POST(request(input))).status,400);
    assert.equal((await POST(request({...input,consent:true},"https://other.example"))).status,403);
    assert.equal((await POST(request({...input,consent:true,padding:"x".repeat(2100)}))).status,413);
    assert.equal(calls,0);
  } finally { global.fetch=original.fetch; for(const [name,value] of [["NETCENTRAL_AI_ENABLED",original.enabled],["OPENAI_API_KEY",original.key],["NETCENTRAL_AI_MODEL",original.model]]) value===undefined?delete process.env[name]:process.env[name]=value; }
});

test("provider receives only curated context and a completed result is validated", async () => {
  const original={enabled:process.env.NETCENTRAL_AI_ENABLED,key:process.env.OPENAI_API_KEY,model:process.env.NETCENTRAL_AI_MODEL,fetch:global.fetch};
  let payload;
  global.fetch=async(_url,options)=>{payload=JSON.parse(options.body);return Response.json({status:"completed",output:[{type:"message",content:[{type:"output_text",text:JSON.stringify(plan())}]}]});};
  try {
    process.env.NETCENTRAL_AI_ENABLED="true";process.env.OPENAI_API_KEY="test-only-fake-key";process.env.NETCENTRAL_AI_MODEL="test-model";
    const response=await POST(new Request("https://net-central.vercel.app/api/action-plan",{method:"POST",headers:{origin:"https://net-central.vercel.app","Content-Type":"application/json","x-forwarded-for":"test-preview"},body:JSON.stringify({...input,consent:true,resume:"PRIVATE_RESUME_SHOULD_NOT_BE_SENT"})}));
    assert.equal(response.status,200);
    const body=await response.json();assert.equal(body.plan.weeks.length,4);
    assert.equal(payload.store,false);assert.equal(payload.model,"test-model");assert.ok(payload.max_output_tokens<=1800);
    assert.ok(!JSON.stringify(payload).includes("PRIVATE_RESUME_SHOULD_NOT_BE_SENT"));
  } finally {global.fetch=original.fetch;for(const [name,value] of [["NETCENTRAL_AI_ENABLED",original.enabled],["OPENAI_API_KEY",original.key],["NETCENTRAL_AI_MODEL",original.model]]) value===undefined?delete process.env[name]:process.env[name]=value;}
});

# NetCentral technical handoff

This handoff covers the site improvements. Gianna handles the presentation and submission. The current review work remains separate from the production branch; merging and publishing require approval.

## Implemented

- Career search, clearer major selection, active navigation and career-specific roadmap/BizPrep links.
- Current-year planning with three priorities, checkable progress, a saved path, homepage continuation and a downloadable text plan.
- Career-prefilled resume preparation and editable, browser-only cover-letter and portfolio guided templates with copy/download controls.
- A native application-tool selector and in-memory preservation when switching between preparation tools. Saved career progress is stored in the current browser; drafts stay in memory on the current page and must be copied or downloaded before leaving or reloading. The draft editor remains available when its text is cleared.
- An optional server-side four-week AI planner, disabled by default. The quiz, standard roadmap, resume review and guided drafts use rules/templates.

## Verification status

The [Verify NetCentral workflow](https://github.com/lowerytj929/NetCentral/actions/workflows/verify.yml) runs dependency installation, full lint, TypeScript, seven targeted tests and a production build. Use the successful run for the current review commit; an older passing run does not verify a later change.

A standalone component review exercised planning, saved progress, guided drafts, keyboard tool selection, clearing/replacing draft text and retaining manual edits when switching tools. Full hosted Next.js navigation, downloads and phone behavior still need acceptance on the current preview.

## Preview and acceptance

A Vercel project owner or authorized team member must authorize the pull-request preview. Confirm the resulting deployment uses the current review commit before checking it. Preview authorization is separate from approval to merge or publish.

Use this synthetic journey:

1. Open `/explore?major=music`, search for sound, and open **Sound Engineering Technician** and its roadmap.
2. Select Year 2, then Year 3. Confirm the URL, heading and three priorities update together. Save the path, check a priority, reload, and use the homepage's saved-path link. Confirm the selected year and progress restore.
3. Open BizPrep through both navigation and roadmap preparation links. Confirm the same major, career and year survive the round trip and the resume role is prefilled.
4. Switch among Resume, Cover Letter and Portfolio using keyboard and pointer. Enter synthetic content, create/edit drafts, switch tools and return; verify in-memory work is retained.
5. Check copy feedback and downloaded plan/draft text. Open the downloaded files and confirm their content, selected year and links. Verify the Word resume template download from the hosted origin.
6. Review desktop and narrow phone layouts, keyboard focus, native tool selection and readable controls. Record which real devices/browsers were actually checked, including iPhone Safari and Android Chrome where available.

## Optional AI activation

Follow [AI setup](AI_SETUP.md). An authorized project owner must approve provider access and costs, then configure these server variables in the preview environment:

- `OPENAI_API_KEY`
- `NETCENTRAL_AI_MODEL`
- `NETCENTRAL_AI_ENABLED=true`

Without all three, the AI control stays hidden and its endpoint returns unavailable without a provider call. The existing per-instance throttle is not a global spending limit.

After authorized configuration, use Music / Sound Engineering Technician / Year 2 / five hours / skills. Verify a real provider response contains four ordered weeks, practical deliverables and only catalog resource links. Review its factual guidance and check timeout, refusal and quota-error recovery. Resume content and checklist progress must not be sent. Record the actual model and outcome; mocked tests and guided templates do not establish a working live AI feature.

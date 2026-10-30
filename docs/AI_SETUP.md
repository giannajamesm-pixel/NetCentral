# NetCentral AI action-plan preview

The quiz, standard roadmaps, resume review, cover-letter drafts and portfolio outlines use explicit rules/templates. They are not presented as live AI.

The optional four-week action planner calls the OpenAI Responses API from a server-only route. It uses the selected career, major, current year, time budget, focus and the existing resource catalog. It does not send uploaded resumes, checklist progress, names, contact details or quiz answers. The student must select the data-sharing checkbox for each request.

## Project configuration

An authorized project owner must configure these server environment variables in the preview environment:

- `OPENAI_API_KEY`: a project-scoped key. Never add it to a commit or prefix it with `NEXT_PUBLIC_`.
- `NETCENTRAL_AI_MODEL`: a model available to that project that supports Responses structured outputs.
- `NETCENTRAL_AI_ENABLED`: `true` only after the owner has reviewed provider access, account costs and project spend limits.

Without all three, the AI control is hidden and the endpoint returns503 without contacting a provider. Guided priorities and the rest of the site continue to work.

The endpoint uses same-origin checks, a2KB request limit, fixed input choices, bounded output, a20-second upstream timeout, no automatic retries and a small in-memory throttle. The throttle is per server instance and is not a durable global spend cap. Set provider/project limits before enabling public traffic.

## Required live verification

Use a synthetic profile such as Music, Sound Engineering Technician, sophomore,5hours per week, skills. Confirm a real provider response contains four weeks and known resource links. Record the actual model, date and result for the pitch. Test refusal, timeout and quota errors. Do not label a mocked test or the standard roadmap as a working live AI demo.

Source: https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses

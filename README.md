# Incoming Analyst

Private equity recruiting coach — Vite + React + TypeScript.

Practice interview formats, build your story and deal library, track readiness, and manage recruiting outreach. Runs fully client-side today (localStorage + curated content); LLM, auth sync, and live integrations are abstracted for a future dedicated server.

## Stack

- Vite 8 + React 19 + TypeScript
- React Router 7
- CSS Modules
- Vitest
- No backend required (GitHub Pages)

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run test
npm run build
npm run preview
npm run lint
```

## Product areas

### Practice
- **Paper LBO** — timed cases, multi-metric asks, sensitivity follow-ups, industry-flavored prompts
- **Technicals** — accounting, valuation, LBO, leverage, return-driver drills (~80+ questions)
- **Flashcards** — rapid-fire review of the technicals bank
- **Fit answers** — core behavioral prompts with 30s/60s models and heuristic grading
- **Business judgment** — market sizing, unit economics, screening frameworks
- **Mock interviews** — scripted fit / technical / deal / mixed / judgment sessions with personas
- **Modeling lab** — paper LBO packs, operating-model drills, downloadable templates
- **Case studies** — CIM-style materials, memo checklists, IC questions

### Prepare
- **PE education** — PE 101, roles, lifecycle, workstreams, glossary
- **Story & resume** — versioned narrative and resume outlines with Markdown export
- **Deal library** — structured deal cards with seniority-specific follow-ups

### Recruit
- **Firm discovery** — firm database, recommendations, source-tagged research briefs
- **Headhunters** — recruiters mapped to PE coverage and prep tips
- **Outreach** — email/LinkedIn templates plus recruiting tracker
- **Integrations** — mock connectors for email, docs, calendar, tracker (live OAuth later)

### Coach
- **Dashboard** — readiness scores, study plan, calendar, post-interview debriefs, backup export/import
- **Recruiting coach** — daily action plan, agent brain recommendations, career tracks, expert contributions, voice helpers
- **Settings** — profile, local auth, privacy controls, CMS content inventory, LLM provider hook (`VITE_LLM_API_URL`)

## Architecture notes

| Concern | Today | Later (dedicated infra) |
|---|---|---|
| Persistence | `localStorage` via `src/lib/profile` | Sync to database |
| Coaching copy | Heuristic LLM provider | Remote LLM agent interface |
| Integrations | Mock connect/disconnect | OAuth + background sync |
| Voice mocks | Web Speech API when available | Hosted STT/TTS |

Core engines: `src/lib/lbo/`, `src/lib/technicals/`, plus curriculum, fit, judgment, mock, modeling, cases, recruiting, infra, and coach modules under `src/lib/`.

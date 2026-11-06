# Incoming Analyst v2

PE analyst interview prep — Vite + React + TypeScript.

## Stack

- Vite 8 + React 19 + TypeScript
- React Router 7
- CSS Modules
- Vitest
- No backend

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run test
npm run build
npm run preview
npm run lint
```

## Modes

### Paper LBO

1. Choose Easy / Medium / Hard
2. Work a randomly styled paper LBO prompt (pen and paper)
3. Answer a random ask (IRR, MoM, equity, Year-N FCF, Sources & Uses by tier)
4. Take up to two interviewer sensitivity follow-ups
5. Review solutions by round

### Technicals

Fast conceptual drills covering:

- Good LBO candidate attributes
- Return drivers (EBITDA, deleveraging, multiples)
- Leverage vs IRR / MoM
- Valuation (EV vs equity, UFCF, comps/DCF)
- Accounting bridges (statements, NWC, D&A tax shield)

MCQ or short numeric answers with immediate explanation. Difficulty unlocks deeper items (Hard includes all tiers).

Core logic: `src/lib/lbo/` (paper LBO) and `src/lib/technicals/` (drill bank).

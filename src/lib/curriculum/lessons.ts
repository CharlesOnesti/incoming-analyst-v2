import type { Lesson } from './types'

export const LESSONS: Lesson[] = [
  {
    id: 'pe101-what-is-pe',
    section: 'pe101',
    title: 'What is private equity?',
    summary:
      'PE funds pool LP capital to buy, improve, and sell companies for equity returns.',
    body: `Private equity (PE) is the business of raising capital from limited partners (LPs), investing that capital into privately held companies, and returning profits after fees and carry.

Core model:
- A general partner (GP) raises a closed-end fund with a finite investment period and fund life.
- The GP buys control or significant influence in portfolio companies, often with leverage (LBOs).
- Value is created through growth, margin expansion, multiple expansion, and debt paydown.
- Exits (sale, IPO, dividend recap) crystallize returns for LPs and the GP’s carried interest.

PE is not venture capital: sponsors typically buy mature cash-flow businesses, not early-stage startups. It is also not hedge-fund public-markets trading: PE is illiquid, control-oriented, and multi-year.`,
    order: 1,
  },
  {
    id: 'pe101-fund-economics',
    section: 'pe101',
    title: 'Fund economics: fees, carry, and waterfalls',
    summary:
      'Management fees fund the firm; carried interest rewards outperformance after the preferred return.',
    body: `A PE fund’s economics sit on two rails: fees and carry.

Management fees:
- Typically ~1.5–2% of committed or invested capital during the investment period, then stepping down.
- Cover salaries, diligence costs, and firm overhead.
- Do not by themselves align GPs with LP outperformance.

Carried interest (carry):
- Usually ~20% of profits above a preferred return (“hurdle”), often 8%.
- Paid after LPs receive capital back plus the preferred return (exact waterfall varies).
- Creates the upside incentive that drives deal selection and exit timing.

Key terms to own:
- Commitment vs. drawn capital (calls)
- DPI / TVPI / MOIC / IRR as return metrics
- Clawbacks and recycling provisions`,
    order: 2,
  },
  {
    id: 'pe101-capital-structure',
    section: 'pe101',
    title: 'Capital structure in a buyout',
    summary:
      'Sponsors blend equity, senior debt, and sometimes mezz/holdco notes to fund the purchase.',
    body: `In a leveraged buyout, sources of funds typically include:
- Sponsor equity (GP fund capital)
- Senior secured debt (revolvers, term loans, bonds)
- Sometimes subordinated / mezzanine debt or preferred equity

Uses of funds typically include:
- Equity purchase price to sellers
- Refinance of existing debt
- Transaction fees and financing fees
- Cash left on the balance sheet

Why leverage matters:
- Amplifies equity returns when EBITDA grows and debt is paid down
- Raises downside risk if cash flow cannot service interest and amortization
- Interviewers expect you to link leverage capacity to FCF stability, cyclicality, and asset quality`,
    order: 3,
  },
  {
    id: 'roles-ladder',
    section: 'roles',
    title: 'Roles from analyst to partner',
    summary:
      'Junior seats own models and diligence; seniors own thesis, IC, and LP relationships.',
    body: `Typical buyout ladder (names vary by firm):

Analyst / Associate:
- Builds LBOs, comps, and CIM digests
- Runs expert calls, data-room diligence, and IC memo appendices
- Owns process hygiene: timelines, Q&A logs, lender packages

Senior Associate / VP:
- Owns workstream leadership across diligence and financing
- Drafts investment committee narratives and leads management meetings
- Begins origination and portfolio operating cadence

Principal / Director:
- Shapes thesis, valuation guardrails, and deal strategy
- Mentors juniors and interfaces with boards and lenders
- Carries more exit and add-on responsibility

Partner / MD:
- Sets fund strategy, capital allocation, and firm culture
- Owns LP relationships and final IC calls
- Sponsors the largest deals and exits`,
    order: 4,
  },
  {
    id: 'roles-day-in-life',
    section: 'roles',
    title: 'Day in the life of an incoming analyst',
    summary:
      'Expect modeling sprints, diligence calls, and memo support under tight process clocks.',
    body: `A strong incoming-analyst week usually mixes:

Modeling and materials:
- Update LBOs when CIM numbers or banker books change
- Build sensitivity tables, sources & uses, and returns bridges
- Clean outputs for IC and lender audiences

Diligence support:
- Schedule and note expert / customer / competitor calls
- Track open questions in a diligence log
- Pull KPIs from data rooms into tracker tabs

Communication:
- Crisp Slack / email updates to the deal team
- Flag risks early with quantified impact where possible
- Never surprise seniors with late model breaks

Culture signal: accuracy, speed, and intellectual honesty beat buzzwords.`,
    order: 5,
  },
  {
    id: 'lifecycle-sourcing-to-loi',
    section: 'lifecycle',
    title: 'Lifecycle: sourcing through LOI',
    summary:
      'Deals start with coverage and screens, then deepen into CIM review, management, and bid strategy.',
    body: `Front half of a deal process:

1. Sourcing / coverage
- Banker relationships, proprietary outreach, and sector maps
- Quick screens: growth, margins, cyclicality, customer concentration, leverage fit

2. Teaser / CIM review
- Extract business model, unit economics, and historical quality of earnings signals
- Build a first-cut LBO and valuation range

3. Management meetings
- Test thesis, management quality, and KPI definitions
- Align on what “good” looks like for the diligence plan

4. Indication of interest → LOI
- Bid strategy balances price, certainty, and structure
- LOI sets exclusivity, diligence rights, and key economic terms`,
    order: 6,
  },
  {
    id: 'lifecycle-diligence-to-close',
    section: 'lifecycle',
    title: 'Lifecycle: diligence through close',
    summary:
      'Confirmatory workstreams stress-test the thesis before financing and legal close.',
    body: `Back half of a deal process:

Confirmatory diligence:
- Commercial: market size, competitive intensity, win rates, churn
- Financial: quality of earnings, net working capital, debt-like items
- Legal / tax / HR / IT / ESG as scoped by risk

Financing:
- Lender package, ratings if relevant, commitment papers
- Structure debt around FCF and covenant headroom

Legal close:
- SPA / APA negotiations, reps & warranties, indemnities or W&I insurance
- Closing accounts, funds flow, and Day-1 operating plan

Post-close:
- 100-day plan, KPI dashboards, board cadence, add-on pipeline`,
    order: 7,
  },
  {
    id: 'lifecycle-value-creation-exit',
    section: 'lifecycle',
    title: 'Value creation and exit paths',
    summary:
      'Returns come from EBITDA growth, multiple change, and deleveraging; exits crystallize them.',
    body: `Hold-period value creation usually falls into three buckets interviewers care about:

1. EBITDA growth — volume, pricing, mix, M&A, cost programs
2. Multiple change — entry vs. exit EV/EBITDA (market and story quality)
3. Deleveraging — free cash flow paying down net debt so equity owns more of EV

Exit paths:
- Strategic sale
- Sponsor-to-sponsor sale
- IPO / dual track
- Dividend recapitalization (partial monetization, not a full exit)

A credible investment memo ties each value-creation lever to owners, timing, and risk.`,
    order: 8,
  },
  {
    id: 'workstreams-expert-cim',
    section: 'workstreams',
    title: 'Workstreams: expert calls and CIM digestion',
    summary:
      'Experts validate the market; CIMs are marketing documents that need structured skepticism.',
    body: `Expert calls:
- Prepare a hypothesis-driven question list before dialing
- Separate fact, anecdote, and vendor bias
- Log quotes against diligence themes (pricing power, switching costs, churn)

CIM digestion:
- Translate banker narrative into a one-page business model
- Rebuild historicals; do not trust adjusted EBITDA at face value
- Flag concentration, seasonality, working-capital quirks, and add-backs
- Produce a preliminary LBO with clear assumption tabs so seniors can challenge inputs`,
    order: 9,
  },
  {
    id: 'workstreams-ic-lbo',
    section: 'workstreams',
    title: 'Workstreams: IC memos and LBO modeling',
    summary:
      'IC materials argue a thesis with numbers; LBOs quantify returns under base, upside, and downside.',
    body: `Investment committee (IC) memos typically cover:
- Company and industry overview
- Investment thesis and key risks
- Valuation and returns (base / upside / downside)
- Diligence findings and open items
- Ask (approve, pass, or conditional next step)

LBO modeling expectations for juniors:
- Clean sources & uses and opening balance sheet
- Revenue → EBITDA → FCF bridge with explicit WC and capex
- Debt schedule with interest and mandatory amortization
- Returns: MOIC, IRR, and equity value bridge
- Sensitivities on entry/exit multiple, EBITDA, and leverage

Good models are auditable: every hard-coded input is labeled and every output reconciles.`,
    order: 10,
  },
  {
    id: 'glossary-core-terms',
    section: 'glossary',
    title: 'Glossary: core PE terms (A–M)',
    summary: 'Quick definitions for interview-ready vocabulary.',
    body: `Add-on / bolt-on — Acquisition by a platform company to expand capabilities or geographies.

AUM — Assets under management; capital a firm manages across funds.

Carry (carried interest) — GP share of profits above the preferred return, often ~20%.

CIM — Confidential information memorandum; banker marketing book for a sale process.

DPI — Distributions to paid-in capital; cash returned to LPs relative to capital called.

EBITDA — Earnings before interest, taxes, depreciation, and amortization; common PE cash-flow proxy (not cash).

Entry / exit multiple — EV/EBITDA (or similar) paid at buy and sell.

GP / LP — General partner runs the fund; limited partners commit capital.

Hurdle / preferred return — Minimum LP return before carry, often ~8%.

IC — Investment committee that approves deals.

IRR — Internal rate of return; time-weighted equity return metric.

LBO — Leveraged buyout; acquisition financed partly with debt.

Management fee — Fee on committed/invested capital that funds firm operations.

MOIC — Multiple on invested capital; ending equity value ÷ equity invested (not time-weighted).`,
    order: 11,
  },
  {
    id: 'glossary-more-terms',
    section: 'glossary',
    title: 'Glossary: core PE terms (N–Z)',
    summary: 'Additional terms spanning diligence, returns, and structure.',
    body: `Net debt — Interest-bearing debt minus cash (definitions vary; watch leases and debt-like items).

Platform — Core portfolio company intended to acquire add-ons.

QoE — Quality of earnings; diligence validating sustainable EBITDA and adjustments.

Sources & uses — Table balancing how a deal is funded and where cash goes at close.

Sponsor — The PE firm / fund leading the buyout.

Teaser — Short anonymous overview sent before a CIM under NDA.

TVPI — Total value to paid-in; DPI plus residual NAV relative to capital called.

Waterfall — Rules for distributing proceeds between LPs and GP (including catch-up).

Working capital peg — Target NWC in the purchase agreement; deviations adjust purchase price.

100-day plan — Near-term post-close operating agenda for value creation.`,
    order: 12,
  },
  {
    id: 'pe101-interview-framing',
    section: 'pe101',
    title: 'How to talk about PE in interviews',
    summary:
      'Anchor answers in LP returns, underwriting discipline, and your role creating decision quality.',
    body: `When interviewers ask “What is PE?” or “Why PE?”, structure around:

1. Capital and mandate — closed-end funds, LP capital, control investing
2. Underwriting — thesis, diligence, leverage, and downside cases
3. Value creation — operating and strategic levers over a multi-year hold
4. Exit and returns — MOIC/IRR for LPs after fees and carry

Personalize with:
- Why you want ownership-oriented investing vs. pure advisory
- Evidence you can model, prioritize, and communicate under ambiguity
- A crisp example of judgment (internship, case, or deal exposure)

Avoid: generic “I like markets,” or confusing PE with public equities day trading.`,
    order: 13,
  },
  {
    id: 'roles-what-good-looks-like',
    section: 'roles',
    title: 'What “good” looks like in the first year',
    summary:
      'Reliability, clean models, and thoughtful flags beat performative intensity.',
    body: `First-year excellence signals:

Output quality:
- Models that reconcile and survive a senior’s stress test
- Notes that capture decisions, not just transcription
- Slides / memos that lead with the so-what

Process:
- Own deadlines; escalate blockers early
- Version control assumptions when numbers change
- Keep a living diligence tracker

Judgment:
- Separate facts, inferences, and recommendations
- Quantify risks when possible
- Ask clarifying questions once, then execute

Relationship:
- Respect banker and management time
- Be coachable; implement feedback the same day`,
    order: 14,
  },
]

export function lessonsForSection(
  section: Lesson['section'],
): Lesson[] {
  return LESSONS.filter((l) => l.section === section).sort(
    (a, b) => a.order - b.order,
  )
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id)
}

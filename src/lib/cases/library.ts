export type CaseStudy = {
  id: string
  title: string
  industry: string
  companySize: string
  durationMin: number
  materials: string
  memoOutline: string[]
  thesisChecklist: string[]
  icQuestions: string[]
}

export const CASE_LIBRARY: CaseStudy[] = [
  {
    id: 'case-midwest-hvac',
    title: 'Midwest HVAC services platform',
    industry: 'Services',
    companySize: '$85M revenue · $14M EBITDA',
    durationMin: 45,
    materials: `# Confidential Information Memorandum — Apex Climate Services

## Overview
Apex is a regional residential and light-commercial HVAC maintenance and replacement platform across OH, IN, and KY.

## Financials (LTM)
- Revenue: $85M (+9% YoY)
- EBITDA: $14M (16.5% margin)
- Capex: ~1.5% of revenue (maintenance)
- Net working capital: ~8% of revenue, seasonal Q2/Q3 peak

## Customers & mix
- ~60% residential maintenance/repair, 40% replacement & light commercial
- Top 10 customers <8% of revenue
- Recurring maintenance contracts: ~35% of revenue

## Growth
- De novo tech adds + tuck-in acquisitions (3 closed in 24 months)
- Same-store growth ~4%; M&A contributes remainder

## Risks flagged in CIM
- Technician wage inflation
- Weather-driven seasonality
- Integration quality of tuck-ins
`,
    memoOutline: [
      'Investment thesis (3 bullets)',
      'Market and competitive position',
      'Unit economics / branch model',
      'Value creation plan',
      'Key risks and diligence plan',
      'Returns sketch (entry, leverage, exit)',
    ],
    thesisChecklist: [
      'Recurring maintenance revenue supports leverage',
      'Fragmented market enables tuck-in M&A',
      'Technician labor risk is underwritten',
      'Add-on integration playbook is credible',
      'Returns sketch (entry, leverage, exit) is coherent',
    ],
    icQuestions: [
      'How do you underwrite technician retention?',
      'What multiple is justified vs. pure-play peers?',
      'Where does weather risk sit in the base case?',
      'How fast can you integrate tuck-ins without NPS damage?',
    ],
  },
  {
    id: 'case-cloud-billing',
    title: 'Vertical SaaS billing for specialty clinics',
    industry: 'SaaS / Healthcare IT',
    companySize: '$42M ARR · 22% Rule of 40',
    durationMin: 50,
    materials: `# CIM — ClinicLedger

## Product
Cloud billing, claims scrubbing, and patient payments for specialty clinics (derm, ortho, GI).

## Metrics (LTM)
- ARR: $42M (+28% YoY)
- Gross margin: 78%
- NRR: 112%
- Logo churn: 6%
- Sales & marketing: 38% of revenue
- Rule of 40: 22

## Go-to-market
- Direct mid-market sales + partner ISVs
- Average ACV: $48k
- Sales cycle: ~5 months

## Competitive landscape
- Horizontal RCM suites and point solutions
- Switching costs high once clearinghouse integrations live

## Risks
- Payer mix complexity
- Implementation backlog
- Healthcare IT budget cycles
`,
    memoOutline: [
      'Why this vertical wins',
      'Retention and expansion quality',
      'GTM efficiency path to Rule of 40',
      'Competitive moat',
      'Diligence workstreams',
      'Entry valuation and returns',
    ],
    thesisChecklist: [
      'NRR durability is underwritten with evidence',
      'Switching costs / retention thesis is clear',
      'Go-to-market efficiency supports growth plan',
      'Regulatory / payer risk is addressed',
      'Exit paths and buyer universe are plausible',
    ],
    icQuestions: [
      'Is 112% NRR durable if logo churn stays at 6%?',
      'How would you underwrite implementation capacity?',
      'What breaks if a mega-RCM competitor bundles billing?',
      'Public vs. strategic exit path in five years?',
    ],
  },
  {
    id: 'case-precision-parts',
    title: 'Precision industrial components carve-out',
    industry: 'Manufacturing',
    companySize: '$210M revenue · $32M EBITDA',
    durationMin: 60,
    materials: `# CIM — NorthForge Precision (carve-out)

## Situation
Corporate parent spinning non-core precision machining for aerospace and industrial OEMs.

## Financials
- Revenue: $210M (flat over 3 years)
- EBITDA: $32M (15.2%), adjusted +$4M for stranded corporate costs
- Backlog: 9 months; ~40% aerospace / 60% industrial

## Operations
- 3 plants (US Midwest); utilization ~78%
- Customer concentration: top customer 18%, top 5 = 46%
- Capex historically under-invested (~2% of sales)

## Transaction
- Carve-out TSA for 18 months (IT, payroll)
- Estimated stranded costs and one-time separation: $8–12M

## Risks
- Aerospace cycle, skilled labor, quality certifications, TSA execution
`,
    memoOutline: [
      'Standalone cost bridge',
      'Customer / program concentration',
      'Capex catch-up plan',
      'Commercial upside vs. cycle',
      'Separation risks',
      'Structure, leverage, returns',
    ],
    thesisChecklist: [
      'Standalone cost structure is credible',
      'Customer concentration risk is sized',
      'Capex / maintenance needs are modeled',
      'Cyclicality is reflected in the base case',
      'TSA / separation plan is diligence-ready',
    ],
    icQuestions: [
      'How much of adjusted EBITDA is real vs. hopeful?',
      'What happens if the top customer cuts 20%?',
      'Is aerospace exposure a feature or a bug at this entry?',
      'How do you fund catch-up capex inside the LBO?',
    ],
  },
  {
    id: 'case-specialty-retail',
    title: 'Omnichannel outdoor specialty retail',
    industry: 'Retail',
    companySize: '$320M revenue · $28M EBITDA',
    durationMin: 45,
    materials: `# CIM — TrailHaus Outdoor

## Banner
Specialty outdoor apparel and equipment; 62 stores + DTC e-commerce (28% of sales).

## Financials
- Revenue: $320M (+3% YoY; stores −1%, digital +14%)
- EBITDA: $28M (8.8%)
- Inventory turns: 2.4x (slowing)
- Four-wall contribution healthy in top quartile stores; bottom 15 stores dilutive

## Strategy options in CIM
- Close / relocate weak stores
- Private-label mix expansion
- Loyalty and rental adjacency

## Risks
- Weather, promotional intensity, brand partners, inventory aging
`,
    memoOutline: [
      'Channel mix and contribution',
      'Store fleet optimization',
      'Inventory and working capital',
      'Brand / private-label plan',
      'Digital profitability',
      'Returns and exit comps',
    ],
    thesisChecklist: [
      'Fleet / store footprint plan is actionable',
      'Inventory turns and working capital are clear',
      'Digital / omnichannel thesis is specific',
      'Margin bridge is quantified',
      'Comps and entry multiple are defended',
    ],
    icQuestions: [
      'How many stores do you close in year one?',
      'What is digital contribution margin after returns?',
      'Can private label offset brand partner pressure?',
      'What multiple do outdoor specialty peers clear?',
    ],
  },
]

export function getCase(id: string): CaseStudy | undefined {
  return CASE_LIBRARY.find((c) => c.id === id)
}

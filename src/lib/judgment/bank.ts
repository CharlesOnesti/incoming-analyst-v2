import type { JudgmentPrompt } from './types'

export const JUDGMENT_PROMPTS: JudgmentPrompt[] = [
  {
    id: 'size-us-hvac-service',
    kind: 'marketSizing',
    prompt:
      'Estimate the annual market size for residential HVAC maintenance and repair services in the United States.',
    framework: [
      'Start from households, not revenue of one vendor',
      'Segment: maintenance contracts vs. break/fix repair',
      'Apply penetration, frequency, and average ticket',
      'Sense-check against known industry reports or adjacencies',
    ],
    checklist: [
      'Stated units and dollars clearly',
      'Called out key assumptions',
      'Gave a range, not a false-precision point',
      'Named what would change the estimate most',
    ],
    workedExample:
      '~130M US households × ~70% with central HVAC ≈ 90M systems. Assume 40% use paid maintenance/repair in a year × $350 average ticket ≈ $13B. Widen to $10–16B for climate mix and DIY. Biggest swings: ticket size and paid-service penetration.',
  },
  {
    id: 'size-dental-dso-tam',
    kind: 'marketSizing',
    prompt:
      'A sponsor is evaluating a dental DSO platform. How would you size the addressable market for multi-site general dentistry in the US?',
    framework: [
      'Top-down: US dental spend → general dentistry share → consolidatable portion',
      'Bottom-up: practices × revenue per practice × DSO-eligible mix',
      'Separate TAM vs. SAM vs. SOM for a given platform',
    ],
    checklist: [
      'Distinguished patient spend from practice revenue',
      'Excluded specialties that the thesis does not buy',
      'Discussed consolidation rate as a growth driver, not the whole TAM',
    ],
    workedExample:
      'US dental spend ~$160B; general dentistry ~60% ≈ $96B practice revenue pool. Independents still majority; assume ~50% economically consolidatable over time ≈ ~$45–50B SAM. A regional platform’s SOM is a small slice defined by geographies and payor mix.',
  },
  {
    id: 'unit-saas-nrr',
    kind: 'unitEconomics',
    prompt:
      'A B2B SaaS company shows 120% NRR, 18-month payback, and 70% gross margin. What looks attractive vs. concerning for a PE underwrite?',
    framework: [
      'Map NRR, CAC payback, gross margin, and logo churn to cash compounding',
      'Ask what drives NRR (upsell vs. price vs. expansion seats)',
      'Pressure-test sales efficiency if growth is slowing',
    ],
    checklist: [
      'Defined NRR vs. GRR',
      'Linked payback to FCF timing in an LBO',
      'Asked about concentration and cohort quality',
    ],
    workedExample:
      'Attractive: NRR >100% implies existing customers expand, supporting retention-led growth; 70% GM is PE-friendly. Concern: 18-month payback means cash is trapped in growth; if new logo growth stalls, leverage capacity shrinks. Diligence GRR, expansion vs. price, and whether NRR is concentrated in a few logos.',
  },
  {
    id: 'unit-marketplace-take-rate',
    kind: 'unitEconomics',
    prompt:
      'A two-sided marketplace takes 12% of GMV. Contribution margin after payment and support costs is 4% of GMV. How do you think about scalability?',
    framework: [
      'Separate take rate from contribution after variable costs',
      'Identify fixed vs. variable cost leverage',
      'Test whether density improves take rate or lowers support cost',
    ],
    checklist: [
      'Did not treat take rate as profit',
      'Asked about incentives on both sides',
      'Linked unit economics to path to EBITDA margin',
    ],
    workedExample:
      '4% contribution on GMV is thin; scale only works if support cost per transaction falls with density or take rate rises with value-added services. Underwrite cohort-level contribution by city and stress a price war that compresses take rate 200 bps.',
  },
  {
    id: 'screen-lbo-candidate',
    kind: 'screening',
    prompt:
      'You have 20 minutes with a teaser for a specialty chemicals distributor. What do you screen for first?',
    framework: [
      'Cash-flow quality and cyclicality',
      'Customer/supplier concentration and switching costs',
      'Working-capital intensity and inventory risk',
      'Margin sustainability vs. commodity pass-through',
    ],
    checklist: [
      'Prioritized questions (not a laundry list)',
      'Tied screens to leverage capacity',
      'Named kill criteria',
    ],
    workedExample:
      'First pass: revenue/EBITDA history through a down cycle, top-10 customer %, gross margin stability, inventory days, and environmental liabilities. Kill if earnings are pure commodity spreads with no sticky service layer, or if WC spikes absorb FCF.',
  },
  {
    id: 'screen-pass-reasons',
    kind: 'screening',
    prompt:
      'Name five disciplined reasons to pass on a deal that still “looks cheap” on entry multiple.',
    framework: [
      'Separate price from business quality',
      'Focus on downside path for debt and equity',
      'Include process/timing and people risks',
    ],
    checklist: [
      'Reasons are underwriting-based, not vibes',
      'At least one capital-structure reason',
      'At least one commercial reason',
    ],
    workedExample:
      'Pass if: (1) customer concentration with near-term RFP, (2) QC of earnings shows unsustainable add-backs, (3) tech obsolescence risk, (4) leverage needs rosy WC release to hit covenants, (5) management unwilling to support a believable 100-day plan.',
  },
  {
    id: 'qual-moat-debate',
    kind: 'qualitative',
    prompt:
      'Management claims a “strong moat” from brand and long relationships. How do you pressure-test that in diligence?',
    framework: [
      'Translate moat into switching costs, pricing power, and win rates',
      'Seek disconfirming evidence from customers and lost deals',
      'Check whether moat shows up in margins and retention cohorts',
    ],
    checklist: [
      'Asked for customer evidence, not slogans',
      'Linked qualitative claims to KPIs',
      'Considered competitor response',
    ],
    workedExample:
      'Ask customers what it would take to switch, review win/loss notes, track price increases vs. volume, and compare gross margin to lesser-known peers. If “relationships” do not survive a 5–10% price gap, the moat is thin.',
  },
  {
    id: 'qual-management-assessment',
    kind: 'qualitative',
    prompt:
      'How would you assess a CEO of a founder-led lower middle-market company in a first management meeting?',
    framework: [
      'Vision clarity and realism',
      'KPI literacy and honesty about miss drivers',
      'Team depth beyond the founder',
      'Openness to PE governance and value-creation plan',
    ],
    checklist: [
      'Covered commercial and people angles',
      'Looked for coachability',
      'Avoided charisma-only judgment',
    ],
    workedExample:
      'Listen for how they explain last year’s miss, whether they know cohort-level unit economics, and who owns pricing/ops when they travel. Red flags: blaming only macro, inability to name second-layer leaders, resistance to board reporting cadence.',
  },
  {
    id: 'unit-retail-store-cohort',
    kind: 'unitEconomics',
    prompt:
      'A multi-site retailer wants capital to open 40 stores. What unit-economic proof do you need before underwriting growth CapEx?',
    framework: [
      'Four-wall contribution after occupancy and labor',
      'Payback and vintage curves by cohort',
      'Cannibalization and real-estate pipeline quality',
    ],
    checklist: [
      'Distinguished new-store vs. mature-store margins',
      'Included build-out CapEx and working capital',
      'Stressed slower ramp cases',
    ],
    workedExample:
      'Need vintage P&Ls showing months to breakeven, mature four-wall margin, CapEx per store, and sales transfer from nearby sites. If payback stretches beyond hold-period comfort in a downside ramp, cut the growth case or stage capital.',
  },
  {
    id: 'market-pricing-power',
    kind: 'marketSizing',
    prompt:
      'How would you estimate pricing power for a niche industrial component supplier?',
    framework: [
      'Cost share in customer BOM',
      'Failure cost / downtime if product fails',
      'Qualified alternatives and switching time',
      'Historical price/volume outcomes',
    ],
    checklist: [
      'Used customer economics, not just inflation anecdotes',
      'Triangulated with win rates and margins',
      'Stated a testable diligence plan',
    ],
    workedExample:
      'If the part is <1% of customer cost but failure stops a line, price elasticity may be low. Validate with customer calls, lost-quote analysis, and whether gross margin held through input-cost spikes. Size the “price-up” opportunity as bps on revenue with volume-risk haircuts.',
  },
  {
    id: 'screen-add-on-fit',
    kind: 'screening',
    prompt:
      'Your platform wants to buy a $15M EBITDA add-on at 9x. How do you screen strategic fit quickly?',
    framework: [
      'Customer overlap vs. new capability',
      'Synergy type: cost, cross-sell, procurement, densification',
      'Integration complexity and culture',
      'Returns with and without synergies',
    ],
    checklist: [
      'Base case does not require heroic synergies',
      'Named who owns integration',
      'Checked customer conflict / channel conflict',
    ],
    workedExample:
      'Screen: shared ICP, complementary SKUs, overlapping freight lanes, and IT stack similarity. Model stand-alone returns at 9x; treat synergies as upside. Pass if the only bridge to firm-wide returns is aggressive cross-sell with no proof from prior add-ons.',
  },
  {
    id: 'qual-risk-ranking',
    kind: 'qualitative',
    prompt:
      'You have three diligence risks: customer concentration, ERP migration mid-hold, and a pending regulatory change. How do you rank and communicate them to IC?',
    framework: [
      'Impact × likelihood × controllability',
      'Map each risk to returns / covenants',
      'Propose mitigants and monitoring KPIs',
    ],
    checklist: [
      'Ranked with rationale',
      'Quantified at least directionally',
      'Clear ask (proceed / condition / pass)',
    ],
    workedExample:
      'Rank concentration first if top customer is 28% and contract renews in 9 months—direct revenue cliff. Regulatory next if timing is uncertain but industry-wide. ERP migration third if phased and vendor-supported. IC slide: risk, $ impact on EBITDA, mitigant, owner, kill switch.',
  },
]

export function getJudgmentPrompt(id: string): JudgmentPrompt | undefined {
  return JUDGMENT_PROMPTS.find((p) => p.id === id)
}

export function promptsForKind(kind: JudgmentPrompt['kind']): JudgmentPrompt[] {
  return JUDGMENT_PROMPTS.filter((p) => p.kind === kind)
}

export function pickJudgmentPrompt(excludeIds: string[] = []): JudgmentPrompt {
  const pool = JUDGMENT_PROMPTS.filter((p) => !excludeIds.includes(p.id))
  const usable = pool.length > 0 ? pool : JUDGMENT_PROMPTS
  return usable[Math.floor(Math.random() * usable.length)]
}

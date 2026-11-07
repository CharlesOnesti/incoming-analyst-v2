import { askCoda } from './asks'
import type { Ask, Difficulty, LboInputs, PromptResult } from './types'

type PromptBuilder = (inputs: LboInputs) => string

const exitPhrase = ({ entryMult, exitMult }: LboInputs) =>
  exitMult === entryMult
    ? `${entryMult} times LTM EBITDA (assume multiple parity for exit)`
    : `${entryMult}x LTM EBITDA and exit at ${exitMult}x`

const structured: PromptBuilder = (inputs) => {
  const {
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  return `You are tasked with evaluating an investment opportunity in Company A, which has an LTM Revenue of $${ltmRev} million and an EBITDA margin of ${ebitdaMargin}%. Your firm is considering making a bid at ${exitPhrase(inputs)} and funding the acquisition with ${debtPercent}% debt with an interest rate of ${intRate}%. The management is confident that the firm can achieve a revenue growth of ${revGrowth}% per year and maintain constant EBITDA margins. The firm has a tax rate of ${taxRate}%. Capital Expenditures are equal to ${capexPr}% of the revenue and are equal to Depreciation. Net Working Capital is ${nwcPr}% of revenue each year.`
}

const bulletBrief: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const multLine =
    exitMult === entryMult
      ? `• Entry / exit multiple: ${entryMult}x LTM EBITDA (parity exit)`
      : `• Entry multiple: ${entryMult}x; exit multiple: ${exitMult}x`
  return `Paper LBO — Company A. Build a 5-year returns case.

• LTM Revenue: $${ltmRev}mm; EBITDA margin: ${ebitdaMargin}% (held constant)
${multLine}
• Capital structure: ${debtPercent}% debt at ${intRate}% interest
• Revenue growth: ${revGrowth}% per year
• Tax rate: ${taxRate}%
• CapEx = ${capexPr}% of revenue = D&A
• NWC = ${nwcPr}% of revenue each year`
}

const interviewer: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const exitBit =
    exitMult === entryMult
      ? 'you can assume we exit at the same multiple'
      : `we'll exit at ${exitMult}x`
  return `Alright — walk me through this paper LBO. Company A did $${ltmRev} million of LTM revenue at a ${ebitdaMargin}% EBITDA margin. We're looking at buying it at ${entryMult}x LTM EBITDA and ${exitBit}. We'll fund ${debtPercent}% of the purchase with debt at ${intRate}% interest. Management thinks they can grow revenue ${revGrowth}% a year and keep margins flat. Tax rate is ${taxRate}%, CapEx runs ${capexPr}% of revenue and equals D&A, and NWC is ${nwcPr}% of revenue every year.`
}

const denseMemo: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const exitBit =
    exitMult === entryMult
      ? 'with exit assumed at multiple parity'
      : `with exit assumed at ${exitMult}x`
  return `IC memo excerpt — Company A. The sponsor proposes acquiring the business at ${entryMult}x LTM EBITDA on $${ltmRev}mm of LTM revenue and a steady ${ebitdaMargin}% EBITDA margin, ${exitBit}. The sources & uses contemplate a ${debtPercent}% debt / ${100 - debtPercent}% equity mix, with debt priced at ${intRate}%. Underwriting assumes ${revGrowth}% annual top-line growth, a ${taxRate}% tax rate, CapEx of ${capexPr}% of revenue (equal to D&A), and NWC of ${nwcPr}% of revenue in each year.`
}

const scrambledOrder: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const exitBit =
    exitMult === entryMult
      ? 'Exit multiple equals entry.'
      : `Exit multiple is ${exitMult}x.`
  return `Build the LBO with the following facts. CapEx equals ${capexPr}% of revenue and matches D&A. ${exitBit} Debt funds ${debtPercent}% of the deal at ${intRate}% interest. LTM revenue is $${ltmRev} million. Tax rate is ${taxRate}%. NWC sits at ${nwcPr}% of revenue each year. Entry multiple is ${entryMult}x LTM EBITDA. EBITDA margin is ${ebitdaMargin}% and stays constant. Revenue grows ${revGrowth}% annually.`
}

/** SaaS flavor — same LboInputs, ARR / NRR language woven into the stem. */
const saasFlavor: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const exitBit =
    exitMult === entryMult
      ? 'exit at the same EV/EBITDA multiple'
      : `exit at ${exitMult}x EV/EBITDA`
  return `Paper LBO — B2B SaaS target. LTM ARR is $${ltmRev} million (treat ARR as the revenue base in the model) with a ${ebitdaMargin}% EBITDA margin and net revenue retention supporting ~${revGrowth}% annual ARR growth. Underwrite entry at ${entryMult}x LTM EBITDA and ${exitBit}. Fund ${debtPercent}% with debt at ${intRate}% cash interest. Tax rate ${taxRate}%. Maintenance CapEx / capitalized software is ${capexPr}% of ARR and equals D&A. Net working capital (mostly deferred revenue / billings timing) is ${nwcPr}% of ARR each year. Margins stay flat.`
}

/** Retail flavor — same LboInputs, store count / SSS language woven into the stem. */
const retailFlavor: PromptBuilder = (inputs) => {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs
  const exitBit =
    exitMult === entryMult
      ? 'assume exit at entry multiple parity'
      : `exit at ${exitMult}x LTM EBITDA`
  return `Paper LBO — multi-store retail chain. LTM revenue is $${ltmRev} million across a mature store base, with EBITDA margin ${ebitdaMargin}%. Management guides mid-single to low-double digit top-line growth of ${revGrowth}% per year from comparable-store sales (SSS) and modest square footage adds. Bid at ${entryMult}x LTM EBITDA and ${exitBit}. Capital structure: ${debtPercent}% debt at ${intRate}% interest. Tax rate ${taxRate}%. Store maintenance CapEx is ${capexPr}% of revenue and equals D&A. Inventory-driven NWC is ${nwcPr}% of revenue each year. Hold margins constant.`
}

const STYLES: Array<{
  id: string
  build: PromptBuilder
  tiers: Difficulty[]
}> = [
  { id: 'structured', build: structured, tiers: ['easy', 'medium'] },
  { id: 'bulletBrief', build: bulletBrief, tiers: ['easy', 'medium', 'hard'] },
  { id: 'interviewer', build: interviewer, tiers: ['medium', 'hard'] },
  { id: 'denseMemo', build: denseMemo, tiers: ['hard'] },
  { id: 'scrambledOrder', build: scrambledOrder, tiers: ['hard'] },
  { id: 'saasFlavor', build: saasFlavor, tiers: ['easy', 'medium', 'hard'] },
  { id: 'retailFlavor', build: retailFlavor, tiers: ['easy', 'medium', 'hard'] },
]

export function buildPrompt(
  inputs: LboInputs,
  difficulty: Difficulty = 'medium',
  ask: Ask = { kind: 'irr' },
): PromptResult {
  const eligible = STYLES.filter((style) => style.tiers.includes(difficulty))
  const chosen = eligible[Math.floor(Math.random() * eligible.length)]
  return {
    text: `${chosen.build(inputs)}\n\n${askCoda(ask)}`,
    styleId: chosen.id,
  }
}

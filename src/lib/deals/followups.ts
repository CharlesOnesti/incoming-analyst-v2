import type { DealSection, DealSeniority } from './types'

export type FollowupTemplates = Record<
  DealSeniority,
  Record<DealSection, string[]>
>

export const FOLLOWUP_TEMPLATES: FollowupTemplates = {
  associate: {
    overview: [
      'What was the company’s revenue and EBITDA at entry?',
      'Was this a proprietary process or auction?',
      'What was your specific role day-to-day?',
    ],
    businessModel: [
      'How does the company make money—recurring, project, or transactional?',
      'Who is the buyer and what problem do they solve?',
      'What are the key unit economics?',
    ],
    industry: [
      'What is industry growth and cyclicality?',
      'How fragmented is the competitive set?',
      'What secular trends matter over the hold?',
    ],
    thesis: [
      'In one sentence, why did the firm buy this?',
      'Which value-creation levers were underwritten?',
      'What would make the thesis wrong?',
    ],
    valuation: [
      'What entry multiple did you pay and vs. what comps?',
      'What was base-case MOIC / IRR?',
      'How sensitive were returns to exit multiple?',
    ],
    structure: [
      'How was the deal financed—equity vs. debt mix?',
      'What were key covenant or amortization features?',
      'Any earnouts, rollover equity, or preferred structure?',
    ],
    diligence: [
      'Which diligence workstream did you own?',
      'What was the most important finding?',
      'How did a finding change the model or bid?',
    ],
    risks: [
      'What were the top three risks at IC?',
      'Which risk materialised, if any?',
      'How did you monitor risks post-close?',
    ],
    contribution: [
      'What analysis are you most proud of on this deal?',
      'Did your work change a decision?',
      'What would you do differently next time?',
    ],
  },
  vp: {
    overview: [
      'How did you prioritize this deal against other live processes?',
      'Who owned IC narrative vs. workstream execution?',
      'What was the critical path to exclusivity?',
    ],
    businessModel: [
      'Where is pricing power proven in the P&L?',
      'How durable is gross margin through a downturn?',
      'What KPI set would you put on the board pack?',
    ],
    industry: [
      'How did you triangulate market size and share?',
      'What competitor responses did you underwrite?',
      'Where could disruption compress returns?',
    ],
    thesis: [
      'Which thesis pillars are must-have vs. upside?',
      'How did you stage capital for the plan?',
      'What operating partner support was required?',
    ],
    valuation: [
      'Walk me through your returns bridge at entry.',
      'What downside case still clears the hurdle—or why not?',
      'How did you think about synergy credit in the bid?',
    ],
    structure: [
      'Why this capital structure versus more/less leverage?',
      'What financing markets contingency did you plan?',
      'How did SPA terms protect against the key risks?',
    ],
    diligence: [
      'Which finding most changed underwriting?',
      'What did you deliberately choose not to diligence deeply, and why?',
      'How did you manage banker and advisor quality?',
    ],
    risks: [
      'What is the kill criterion you nearly hit?',
      'How are risks allocated between purchase price, structure, and plan?',
      'What early-warning metrics did you install?',
    ],
    contribution: [
      'Where did you exercise judgment beyond modeling?',
      'How did you coach juniors on this process?',
      'What would you reuse as a playbook?',
    ],
  },
  partner: {
    overview: [
      'Why did this deal fit the fund’s mandate and pacing?',
      'How does it sit in the portfolio from a correlation/risk view?',
      'What was the governance plan at close?',
    ],
    businessModel: [
      'Is this a company you would still buy in a tighter credit market?',
      'What is the enduring edge five years out?',
      'Where could adjacency M&A create a different business?',
    ],
    industry: [
      'What industry structure needs to be true for this to be a fund-returner?',
      'How do you think about timing in the cycle?',
      'Which macro variables actually matter here?',
    ],
    thesis: [
      'What is the partner-level conviction story in 60 seconds?',
      'What would cause you to exit early?',
      'How much of returns are underwriting vs. talent/operating excellence?',
    ],
    valuation: [
      'Where did you stretch on price and why was that rational?',
      'How do LP optics and DPI timing factor into exit design?',
      'What valuation discipline do you refuse to break?',
    ],
    structure: [
      'How did firm-level leverage appetite constrain the deal?',
      'What financing or syndicate relationships were decisive?',
      'How did you align management incentives with the hold plan?',
    ],
    diligence: [
      'What diligence was decisive for your personal yes/no?',
      'When have you overruled a bullish team, and why?',
      'How do you know when diligence is “done enough”?',
    ],
    risks: [
      'What risk keeps you up at night on this name?',
      'How would you explain a loss on this deal to LPs?',
      'What portfolio action would you take if the thesis slips?',
    ],
    contribution: [
      'What did you personally unlock—relationship, judgment, or capital?',
      'How does this deal develop the next generation on your team?',
      'What firm-building lesson came from this process?',
    ],
  },
}

export function followupsFor(
  seniority: DealSeniority,
  section: DealSection,
): string[] {
  return FOLLOWUP_TEMPLATES[seniority][section]
}

import type { InterviewMode, InterviewPersona } from './types'

export type ScriptNode = {
  id: string
  personaTone: Partial<Record<InterviewPersona, string>>
  preface: string
  question: string
  followUps: string[]
  rubric: string[]
}

export const SCRIPT_TREES: Record<InterviewMode, ScriptNode[]> = {
  fit: [
    {
      id: 'fit-walk-resume',
      personaTone: {
        associate: 'Friendly screen — looking for clarity and PE motivation.',
        vp: 'Crisp and time-boxed — wants a sharp narrative.',
        partner: 'Evaluating ownership mindset and judgment.',
        headhunter: 'Checking coachability and story polish.',
      },
      preface: 'Start with your story — keep it under two minutes.',
      question: 'Walk me through your resume and why PE now.',
      followUps: [
        'What would you change about your last internship?',
        'Why this firm over a larger platform?',
      ],
      rubric: [
        'clear narrative',
        'why pe',
        'ownership',
        'diligence',
        'specific outcomes',
      ],
    },
    {
      id: 'fit-strength-weakness',
      personaTone: {
        associate: 'Looking for self-awareness without fluff.',
        vp: 'Wants a real weakness with a fix plan.',
        partner: 'Tests honesty and growth trajectory.',
        headhunter: 'Screens for red flags and polish.',
      },
      preface: 'Be specific — avoid clichés.',
      question: 'What is your greatest strength and a real weakness you are working on?',
      followUps: [
        'Give me an example where that strength created value.',
        'How would teammates describe that weakness?',
      ],
      rubric: [
        'self-awareness',
        'example',
        'improvement plan',
        'impact',
        'honest',
      ],
    },
    {
      id: 'fit-why-firm',
      personaTone: {
        associate: 'Checks whether you did homework on the firm.',
        vp: 'Wants sector or culture fit signals.',
        partner: 'Looking for genuine interest in the platform.',
        headhunter: 'Validates targeting and process readiness.',
      },
      preface: 'Tie firm specifics to your experience.',
      question: 'Why our firm, and why this seat?',
      followUps: [
        'Which portfolio company would you want to diligence first?',
        'What do you think differentiates our investing style?',
      ],
      rubric: [
        'firm knowledge',
        'sector',
        'culture',
        'role clarity',
        'portfolio',
      ],
    },
  ],
  technical: [
    {
      id: 'tech-lbo-walkthrough',
      personaTone: {
        associate: 'Tests whether you can walk sources and uses cleanly.',
        vp: 'Pushes on returns drivers and sensitivities.',
        partner: 'Wants crisp judgment on what matters.',
        headhunter: 'Checks baseline technical fluency.',
      },
      preface: 'Keep the walkthrough structured.',
      question: 'Walk me through a basic LBO from entry to exit returns.',
      followUps: [
        'What happens to IRR if exit multiple compresses one turn?',
        'How would you size debt capacity?',
      ],
      rubric: [
        'sources and uses',
        'debt',
        'free cash flow',
        'exit',
        'irr',
        'moic',
      ],
    },
    {
      id: 'tech-enterprise-equity',
      personaTone: {
        associate: 'Screening for bridge mechanics.',
        vp: 'Wants clean treatment of cash and debt.',
        partner: 'Looking for conceptual clarity under pressure.',
        headhunter: 'Confirms you can pass a first-round screen.',
      },
      preface: 'Define terms before bridging.',
      question: 'How do you bridge enterprise value to equity value?',
      followUps: [
        'Where do leases and pensions sit in the bridge?',
        'How does excess cash affect equity value?',
      ],
      rubric: [
        'enterprise value',
        'net debt',
        'cash',
        'equity value',
        'nci',
        'bridge',
      ],
    },
    {
      id: 'tech-working-capital',
      personaTone: {
        associate: 'Checks FCF fluency.',
        vp: 'Wants operational intuition, not just formulas.',
        partner: 'Looking for diligence instincts.',
        headhunter: 'Baseline working-capital literacy.',
      },
      preface: 'Connect WC to cash.',
      question: 'How does an increase in net working capital affect free cash flow in an LBO?',
      followUps: [
        'Give an example from a seasonal business.',
        'How would you diligence inventory quality?',
      ],
      rubric: [
        'working capital',
        'cash',
        'free cash flow',
        'inventory',
        'receivables',
        'payables',
      ],
    },
  ],
  deal: [
    {
      id: 'deal-walkthrough',
      personaTone: {
        associate: 'Looking for a crisp thesis and your role.',
        vp: 'Pushes on risks and what you missed.',
        partner: 'Evaluates investment judgment.',
        headhunter: 'Checks you have a real deal story.',
      },
      preface: 'Lead with thesis, then process and outcome.',
      question: 'Walk me through a deal you worked on end-to-end.',
      followUps: [
        'What was the key underwriting risk?',
        'What would you have done differently?',
      ],
      rubric: [
        'thesis',
        'diligence',
        'role',
        'risks',
        'returns',
        'outcome',
      ],
    },
    {
      id: 'deal-competition',
      personaTone: {
        associate: 'Tests competitive dynamics awareness.',
        vp: 'Wants process judgment and positioning.',
        partner: 'Looking for commercial instincts.',
        headhunter: 'Validates process vocabulary.',
      },
      preface: 'Be concrete about buyer set and dynamics.',
      question: 'Describe a competitive process and how you thought about winning.',
      followUps: [
        'When would you walk away?',
        'How did financing constrain the bid?',
      ],
      rubric: [
        'process',
        'buyer set',
        'valuation',
        'financing',
        'walk away',
        'edge',
      ],
    },
    {
      id: 'deal-value-creation',
      personaTone: {
        associate: 'Checks operating / value-creation vocabulary.',
        vp: 'Wants measurable levers.',
        partner: 'Looking for ownership mindset.',
        headhunter: 'Screens for PE-native language.',
      },
      preface: 'Separate multiple, margin, and growth.',
      question: 'How did / would the sponsor create value over the hold?',
      followUps: [
        'Which lever was most under management control?',
        'What KPIs would you track monthly?',
      ],
      rubric: [
        'margin',
        'growth',
        'multiple',
        'debt paydown',
        'kpi',
        'initiatives',
      ],
    },
  ],
  mixed: [
    {
      id: 'mixed-fit-tech',
      personaTone: {
        associate: 'Hybrid screen — story then mechanics.',
        vp: 'Sees if you can switch registers fast.',
        partner: 'Tests composure across formats.',
        headhunter: 'Mirrors a typical first round.',
      },
      preface: 'You will get both fit and technical beats.',
      question: 'Tell me why PE, then walk through how leverage amplifies equity returns.',
      followUps: [
        'When does leverage destroy value?',
        'How does your background prepare you for modeling days?',
      ],
      rubric: [
        'why pe',
        'leverage',
        'equity returns',
        'downside',
        'modeling',
      ],
    },
    {
      id: 'mixed-market-deal',
      personaTone: {
        associate: 'Looking for commercial sense plus structure.',
        vp: 'Wants market view tied to underwriting.',
        partner: 'Judges investment taste.',
        headhunter: 'Checks breadth.',
      },
      preface: 'Connect market view to a live deal.',
      question: 'Pick a sector you like and outline how you would underwrite a platform acquisition.',
      followUps: [
        'What is the key diligence workstream?',
        'How would you size the add-on opportunity?',
      ],
      rubric: [
        'sector',
        'thesis',
        'underwrite',
        'diligence',
        'add-on',
        'returns',
      ],
    },
    {
      id: 'mixed-behavioral-case',
      personaTone: {
        associate: 'Tests teamwork under ambiguity.',
        vp: 'Wants conflict-handling with substance.',
        partner: 'Looking for leadership signals.',
        headhunter: 'Behavioral polish check.',
      },
      preface: 'Use a real example with a decision.',
      question: 'Describe a time you disagreed with a teammate on analysis — how did you resolve it, and what was the investment implication?',
      followUps: [
        'What data changed the conclusion?',
        'How did you communicate the final recommendation?',
      ],
      rubric: [
        'conflict',
        'analysis',
        'data',
        'recommendation',
        'communication',
        'outcome',
      ],
    },
  ],
  judgment: [
    {
      id: 'judgment-market-size',
      personaTone: {
        associate: 'Looking for structured assumptions.',
        vp: 'Pushes on sensitivity of drivers.',
        partner: 'Wants commercial intuition.',
        headhunter: 'Checks structured thinking.',
      },
      preface: 'State assumptions out loud.',
      question: 'Estimate the US market for outsourced IT managed services for mid-market companies.',
      followUps: [
        'Which assumption moves the answer most?',
        'How would you diligence the estimate?',
      ],
      rubric: [
        'assumptions',
        'units',
        'range',
        'drivers',
        'sense-check',
      ],
    },
    {
      id: 'judgment-buy-pass',
      personaTone: {
        associate: 'Tests framework for go / no-go.',
        vp: 'Wants clear risk articulation.',
        partner: 'Looking for investment taste.',
        headhunter: 'Screens for PE judgment vocabulary.',
      },
      preface: 'Make a call and defend it.',
      question: 'A durable goods distributor trades at 9x EBITDA with flat volumes. Do you buy or pass, and why?',
      followUps: [
        'What diligence would change your mind?',
        'How would you underwrite cyclicality?',
      ],
      rubric: [
        'thesis',
        'risks',
        'multiple',
        'cyclicality',
        'diligence',
        'decision',
      ],
    },
    {
      id: 'judgment-kpi',
      personaTone: {
        associate: 'Checks operating literacy.',
        vp: 'Wants leading vs lagging metrics.',
        partner: 'Looking for board-level instincts.',
        headhunter: 'Validates business fluency.',
      },
      preface: 'Pick a business model and go deep.',
      question: 'For a multi-site veterinary platform, which KPIs would you watch monthly and why?',
      followUps: [
        'How would you detect same-store deterioration early?',
        'Which KPI is most gameable?',
      ],
      rubric: [
        'kpi',
        'same-store',
        'retention',
        'utilization',
        'margin',
        'leading indicator',
      ],
    },
  ],
}

export function scriptsForMode(mode: InterviewMode): ScriptNode[] {
  return SCRIPT_TREES[mode]
}

export function getScriptNode(
  mode: InterviewMode,
  index: number,
): ScriptNode | undefined {
  return SCRIPT_TREES[mode][index]
}

export function personaPreface(
  node: ScriptNode,
  persona: InterviewPersona,
): string {
  const tone = node.personaTone[persona]
  return tone ? `${tone} ${node.preface}` : node.preface
}

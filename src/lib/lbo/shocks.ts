import { askCoda } from './asks'
import { solve } from './solve'
import type { Ask, LboInputs, Shock, ShockId } from './types'

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const pick = <T>(options: T[]): T =>
  options[Math.floor(Math.random() * options.length)]

export const SHOCKS: Shock[] = [
  {
    id: 'exitMultUp',
    label: 'exit multiple +1.0x',
    apply: (inputs) => ({
      ...inputs,
      exitMult: clamp(inputs.exitMult + 1, 4, 25),
    }),
  },
  {
    id: 'exitMultDown',
    label: 'exit multiple −1.0x',
    apply: (inputs) => ({
      ...inputs,
      exitMult: clamp(inputs.exitMult - 1, 4, 25),
    }),
  },
  {
    id: 'revGrowthUp',
    label: 'revenue growth +5pp',
    apply: (inputs) => ({
      ...inputs,
      revGrowth: clamp(inputs.revGrowth + 5, 0, 30),
    }),
  },
  {
    id: 'revGrowthDown',
    label: 'revenue growth −5pp',
    apply: (inputs) => ({
      ...inputs,
      revGrowth: clamp(inputs.revGrowth - 5, 0, 30),
    }),
  },
  {
    id: 'marginUp',
    label: 'EBITDA margin +5pp',
    apply: (inputs) => ({
      ...inputs,
      ebitdaMargin: clamp(inputs.ebitdaMargin + 5, 5, 50),
    }),
  },
  {
    id: 'marginDown',
    label: 'EBITDA margin −5pp',
    apply: (inputs) => ({
      ...inputs,
      ebitdaMargin: clamp(inputs.ebitdaMargin - 5, 5, 50),
    }),
  },
  {
    id: 'debtUp',
    label: 'debt funding +10pp',
    apply: (inputs) => ({
      ...inputs,
      debtPercent: clamp(inputs.debtPercent + 10, 20, 80),
    }),
  },
  {
    id: 'debtDown',
    label: 'debt funding −10pp',
    apply: (inputs) => ({
      ...inputs,
      debtPercent: clamp(inputs.debtPercent - 10, 20, 80),
    }),
  },
  {
    id: 'taxRateUp',
    label: 'tax rate +5pp',
    apply: (inputs) => ({
      ...inputs,
      taxRate: clamp(inputs.taxRate + 5, 10, 45),
    }),
  },
  {
    id: 'taxRateDown',
    label: 'tax rate −5pp',
    apply: (inputs) => ({
      ...inputs,
      taxRate: clamp(inputs.taxRate - 5, 10, 45),
    }),
  },
  {
    id: 'capexUp',
    label: 'CapEx +5pp of revenue',
    apply: (inputs) => ({
      ...inputs,
      capexPr: clamp(inputs.capexPr + 5, 0, 25),
    }),
  },
  {
    id: 'capexDown',
    label: 'CapEx −5pp of revenue',
    apply: (inputs) => ({
      ...inputs,
      capexPr: clamp(inputs.capexPr - 5, 0, 25),
    }),
  },
  {
    id: 'intRateUp',
    label: 'interest rate +2pp',
    apply: (inputs) => ({
      ...inputs,
      intRate: clamp(inputs.intRate + 2, 2, 20),
    }),
  },
  {
    id: 'intRateDown',
    label: 'interest rate −2pp',
    apply: (inputs) => ({
      ...inputs,
      intRate: clamp(inputs.intRate - 2, 2, 20),
    }),
  },
]

const FOLLOW_UP_ASKS: Ask[] = [
  { kind: 'irr' },
  { kind: 'mom' },
  { kind: 'exitEquity' },
]

export function mutateInputs(inputs: LboInputs, shock: Shock): LboInputs {
  return shock.apply(inputs)
}

export function pickShock(excludeIds: ShockId[] = []): Shock {
  const eligible = SHOCKS.filter((shock) => !excludeIds.includes(shock.id))
  const pool = eligible.length > 0 ? eligible : SHOCKS
  return pick(pool)
}

export function pickFollowUpAsk(): Ask {
  return pick(FOLLOW_UP_ASKS)
}

export function buildFollowUpPrompt(
  baseInputs: LboInputs,
  shock: Shock,
  ask: Ask,
): string {
  const next = mutateInputs(baseInputs, shock)
  const lines: string[] = [
    'Holding all other assumptions constant, the interviewer changes one input:',
  ]

  switch (shock.id) {
    case 'exitMultUp':
    case 'exitMultDown':
      lines.push(
        `Exit at ${next.exitMult}x Year-5 EBITDA (was ${baseInputs.exitMult}x).`,
      )
      break
    case 'revGrowthUp':
    case 'revGrowthDown':
      lines.push(
        `Revenue growth is ${next.revGrowth}% per year (was ${baseInputs.revGrowth}%).`,
      )
      break
    case 'marginUp':
    case 'marginDown':
      lines.push(
        `EBITDA margin is ${next.ebitdaMargin}% (was ${baseInputs.ebitdaMargin}%).`,
      )
      break
    case 'debtUp':
    case 'debtDown':
      lines.push(
        `The deal is funded with ${next.debtPercent}% debt (was ${baseInputs.debtPercent}%).`,
      )
      break
    case 'taxRateUp':
    case 'taxRateDown':
      lines.push(
        `The tax rate is ${next.taxRate}% (was ${baseInputs.taxRate}%).`,
      )
      break
    case 'capexUp':
    case 'capexDown':
      lines.push(
        `CapEx is ${next.capexPr}% of revenue and equals D&A (was ${baseInputs.capexPr}%).`,
      )
      break
    case 'intRateUp':
    case 'intRateDown':
      lines.push(
        `Debt interest rate is ${next.intRate}% (was ${baseInputs.intRate}%).`,
      )
      break
  }

  lines.push('', askCoda(ask))
  return lines.join('\n')
}

export function applyFollowUp(
  baseInputs: LboInputs,
  usedShockIds: ShockId[] = [],
): {
  inputs: LboInputs
  solution: ReturnType<typeof solve>
  ask: Ask
  shock: Shock
  promptText: string
} {
  const shock = pickShock(usedShockIds)
  const ask = pickFollowUpAsk()
  const inputs = mutateInputs(baseInputs, shock)
  const solution = solve(inputs)
  return {
    inputs,
    solution,
    ask,
    shock,
    promptText: buildFollowUpPrompt(baseInputs, shock, ask),
  }
}

export const MAX_FOLLOW_UPS = 2

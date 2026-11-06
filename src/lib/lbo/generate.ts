import type { Difficulty, LboInputs } from './types'

const pick = <T>(options: T[]): T =>
  options[Math.floor(Math.random() * options.length)]

const range = (min: number, max: number, step: number): number[] => {
  const values: number[] = []
  for (let i = min; i <= max; i += step) {
    values.push(i)
  }
  return values
}

type DifficultyConfig = {
  entryMult: number[]
  ltmRev: number[]
  ebitdaMargin: number[]
  debtPercent: number[]
  intRate: number[]
  revGrowth: number[] | ((entryMult: number) => number)
  taxRate: number[]
  capexPr: number[]
  nwcPr: number[]
}

const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    entryMult: range(8, 12, 1),
    ltmRev: range(200, 500, 100),
    ebitdaMargin: [20, 30],
    debtPercent: [50, 60],
    intRate: [5, 10],
    revGrowth: [5, 10],
    taxRate: [25, 30],
    capexPr: [5, 10],
    nwcPr: [10, 20],
  },
  medium: {
    entryMult: range(10, 15, 1),
    ltmRev: range(100, 900, 100),
    ebitdaMargin: [20, 30, 40],
    debtPercent: [40, 50, 60],
    intRate: [5, 10],
    revGrowth: (entryMult) => (entryMult < 13 ? 5 : 10),
    taxRate: range(20, 40, 5),
    capexPr: [5, 10],
    nwcPr: [10, 20],
  },
  hard: {
    entryMult: range(8, 18, 1),
    ltmRev: range(150, 950, 50),
    ebitdaMargin: range(15, 40, 5),
    debtPercent: range(40, 70, 5),
    intRate: [5, 8, 10, 12],
    revGrowth: range(5, 20, 5),
    taxRate: range(20, 40, 5),
    capexPr: [5, 10, 15],
    nwcPr: [5, 10, 15, 20],
  },
}

export function generate(difficulty: Difficulty = 'medium'): LboInputs {
  const config = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium
  const entryMult = pick(config.entryMult)
  const revGrowth =
    typeof config.revGrowth === 'function'
      ? config.revGrowth(entryMult)
      : pick(config.revGrowth)

  return {
    entryMult,
    exitMult: entryMult,
    ltmRev: pick(config.ltmRev),
    ebitdaMargin: pick(config.ebitdaMargin),
    debtPercent: pick(config.debtPercent),
    intRate: pick(config.intRate),
    revGrowth,
    taxRate: pick(config.taxRate),
    capexPr: pick(config.capexPr),
    nwcPr: pick(config.nwcPr),
  }
}

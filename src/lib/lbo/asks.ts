import { irrPercent } from './solve'
import type {
  Ask,
  AskKind,
  Difficulty,
  FcfYear,
  LboSolution,
  SourcesUsesAnswer,
} from './types'

const DOLLAR_TOLERANCE = 2
const MOM_TOLERANCE = 0.1
const IRR_TOLERANCE = 2.5

const ASK_POOLS: Record<Difficulty, AskKind[]> = {
  easy: ['irr', 'mom', 'entryEquity'],
  medium: ['irr', 'mom', 'entryEquity', 'exitEquity', 'yearFcf'],
  hard: ['irr', 'mom', 'entryEquity', 'exitEquity', 'yearFcf', 'sourcesUses'],
}

const FCF_YEARS: FcfYear[] = [1, 2, 3, 4, 5]

const pick = <T>(options: T[]): T =>
  options[Math.floor(Math.random() * options.length)]

export function askPoolFor(difficulty: Difficulty): AskKind[] {
  return ASK_POOLS[difficulty]
}

export function pickAsk(difficulty: Difficulty = 'medium'): Ask {
  const kind = pick(ASK_POOLS[difficulty])
  if (kind === 'yearFcf') {
    return { kind: 'yearFcf', year: pick(FCF_YEARS) }
  }
  return { kind }
}

export function askCoda(ask: Ask): string {
  switch (ask.kind) {
    case 'irr':
      return 'What is the 5-year IRR (%)?'
    case 'mom':
      return 'What is the MoM equity multiple?'
    case 'entryEquity':
      return 'What equity check does the sponsor write at close ($mm)?'
    case 'exitEquity':
      return 'What is exit equity value in year 5 ($mm)?'
    case 'yearFcf':
      return `What is Year ${ask.year} free cash flow ($mm)?`
    case 'sourcesUses':
      return 'Walk me through Sources & Uses at entry. What are Entry EV, Debt, and Sponsor Equity ($mm)?'
  }
}

export function askLabel(ask: Ask): string {
  switch (ask.kind) {
    case 'irr':
      return 'IRR'
    case 'mom':
      return 'MoM'
    case 'entryEquity':
      return 'Entry Equity'
    case 'exitEquity':
      return 'Exit Equity'
    case 'yearFcf':
      return `Year ${ask.year} FCF`
    case 'sourcesUses':
      return 'Sources & Uses'
  }
}

export function askUnit(ask: Ask): string {
  switch (ask.kind) {
    case 'irr':
      return '%'
    case 'mom':
      return 'x'
    case 'entryEquity':
    case 'exitEquity':
    case 'yearFcf':
    case 'sourcesUses':
      return '$mm'
  }
}

export function askFieldLabel(ask: Ask): string {
  switch (ask.kind) {
    case 'irr':
      return 'IRR (%)'
    case 'mom':
      return 'MoM (x)'
    case 'entryEquity':
      return 'Entry equity ($mm)'
    case 'exitEquity':
      return 'Exit equity ($mm)'
    case 'yearFcf':
      return `Year ${ask.year} FCF ($mm)`
    case 'sourcesUses':
      return 'Sources & Uses ($mm)'
  }
}

export function askPlaceholder(ask: Ask): string {
  switch (ask.kind) {
    case 'irr':
      return 'e.g. 18.5'
    case 'mom':
      return 'e.g. 2.1'
    case 'entryEquity':
    case 'exitEquity':
    case 'yearFcf':
      return 'e.g. 240'
    case 'sourcesUses':
      return ''
  }
}

export function getAnswer(
  solution: LboSolution,
  ask: Ask,
): number | SourcesUsesAnswer {
  const { returns, financials, irr } = solution
  switch (ask.kind) {
    case 'irr':
      return irrPercent(irr)
    case 'mom':
      return Math.round(returns.mom * 100) / 100
    case 'entryEquity':
      return Math.round(returns.entryEquity)
    case 'exitEquity':
      return Math.round(returns.exitEquity)
    case 'yearFcf':
      return Math.round(financials.FCF[ask.year])
    case 'sourcesUses':
      return {
        entryEv: Math.round(returns.entryEv),
        debt: Math.round(returns.entryNd),
        equity: Math.round(returns.entryEquity),
      }
  }
}

function within(attempt: number, correct: number, tolerance: number): boolean {
  return Number.isFinite(attempt) && Math.abs(attempt - correct) < tolerance
}

export type GradeResult = {
  passed: boolean
  displayCorrect: string
  displayAttempt: string
}

export type SingleAttempt = { value: number }
export type SourcesUsesAttempt = {
  entryEv: number
  debt: number
  equity: number
}

export function formatAnswer(ask: Ask, value: number | SourcesUsesAnswer): string {
  if (ask.kind === 'sourcesUses' && typeof value === 'object') {
    return `EV $${value.entryEv} / Debt $${value.debt} / Equity $${value.equity}`
  }
  const n = value as number
  switch (ask.kind) {
    case 'irr':
      return `${n}%`
    case 'mom':
      return `${n}x`
    default:
      return `$${n}`
  }
}

export function gradeAttempt(
  attempt: SingleAttempt | SourcesUsesAttempt,
  solution: LboSolution,
  ask: Ask,
): GradeResult {
  const correct = getAnswer(solution, ask)

  if (ask.kind === 'sourcesUses') {
    const answer = correct as SourcesUsesAnswer
    const a = attempt as SourcesUsesAttempt
    const passed =
      within(a.entryEv, answer.entryEv, DOLLAR_TOLERANCE) &&
      within(a.debt, answer.debt, DOLLAR_TOLERANCE) &&
      within(a.equity, answer.equity, DOLLAR_TOLERANCE)
    return {
      passed,
      displayCorrect: formatAnswer(ask, answer),
      displayAttempt: formatAnswer(ask, {
        entryEv: a.entryEv,
        debt: a.debt,
        equity: a.equity,
      }),
    }
  }

  const value = (attempt as SingleAttempt).value
  const answer = correct as number
  let passed = false
  if (ask.kind === 'irr') {
    passed = within(value, answer, IRR_TOLERANCE)
  } else if (ask.kind === 'mom') {
    passed = within(value, answer, MOM_TOLERANCE)
  } else {
    passed = within(value, answer, DOLLAR_TOLERANCE)
  }

  return {
    passed,
    displayCorrect: formatAnswer(ask, answer),
    displayAttempt: Number.isFinite(value)
      ? formatAnswer(ask, value)
      : String(value),
  }
}

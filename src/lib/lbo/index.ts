import { pickAsk } from './asks'
import { buildPrompt } from './prompts'
import { generate } from './generate'
import { solve } from './solve'
import type { Difficulty, Scenario } from './types'

export type {
  Ask,
  AskKind,
  Difficulty,
  LboInputs,
  LboSolution,
  Scenario,
  Shock,
  ShockId,
  SourcesUsesAnswer,
} from './types'
export { generate } from './generate'
export { solve, irrPercent } from './solve'
export { buildPrompt } from './prompts'
export {
  askCoda,
  askFieldLabel,
  askLabel,
  askPlaceholder,
  askPoolFor,
  askUnit,
  formatAnswer,
  getAnswer,
  gradeAttempt,
  pickAsk,
} from './asks'
export type { GradeResult } from './asks'
export {
  MAX_FOLLOW_UPS,
  SHOCKS,
  applyFollowUp,
  buildFollowUpPrompt,
  mutateInputs,
  pickFollowUpAsk,
  pickShock,
} from './shocks'
export { FINANCIAL_LABELS, FINANCIAL_ORDER } from './names'

export function makeScenario(difficulty: Difficulty = 'medium'): Scenario {
  const inputs = generate(difficulty)
  const solution = solve(inputs)
  const ask = pickAsk(difficulty)
  const prompt = buildPrompt(inputs, difficulty, ask)
  return {
    inputs,
    solution,
    ask,
    promptText: prompt.text,
    styleId: prompt.styleId,
    difficulty,
  }
}

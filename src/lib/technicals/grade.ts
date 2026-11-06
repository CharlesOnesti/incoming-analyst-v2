import type { Difficulty } from '../lbo/types'
import { TECHNICAL_QUESTIONS } from './bank'
import type { TechnicalGrade, TechnicalQuestion } from './types'

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

export function questionsForDifficulty(
  difficulty: Difficulty,
): TechnicalQuestion[] {
  const maxRank = DIFFICULTY_RANK[difficulty]
  return TECHNICAL_QUESTIONS.filter(
    (q) => DIFFICULTY_RANK[q.difficulty] <= maxRank,
  )
}

export function pickQuestion(
  difficulty: Difficulty,
  excludeIds: string[] = [],
): TechnicalQuestion {
  const pool = questionsForDifficulty(difficulty).filter(
    (q) => !excludeIds.includes(q.id),
  )
  const usable = pool.length > 0 ? pool : questionsForDifficulty(difficulty)
  return usable[Math.floor(Math.random() * usable.length)]
}

export function gradeMcq(
  question: TechnicalQuestion,
  choiceId: string,
): TechnicalGrade {
  const correct = question.choices?.find(
    (c) => c.id === question.correctChoiceId,
  )
  const attempt = question.choices?.find((c) => c.id === choiceId)
  const passed = choiceId === question.correctChoiceId
  return {
    passed,
    displayCorrect: correct?.text ?? String(question.correctChoiceId),
    displayAttempt: attempt?.text ?? choiceId,
  }
}

export function gradeNumeric(
  question: TechnicalQuestion,
  value: number,
): TechnicalGrade {
  const correct = question.correctValue ?? 0
  const tolerance = question.tolerance ?? 0.5
  const passed = Number.isFinite(value) && Math.abs(value - correct) <= tolerance
  return {
    passed,
    displayCorrect: String(correct),
    displayAttempt: Number.isFinite(value) ? String(value) : String(value),
  }
}

export function gradeQuestion(
  question: TechnicalQuestion,
  attempt: { choiceId?: string; value?: number },
): TechnicalGrade {
  if (question.kind === 'mcq') {
    return gradeMcq(question, attempt.choiceId ?? '')
  }
  return gradeNumeric(question, attempt.value ?? Number.NaN)
}

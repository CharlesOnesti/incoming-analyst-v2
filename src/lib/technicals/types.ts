import type { Difficulty } from '../lbo/types'

export type TechnicalTopic =
  | 'lboCandidate'
  | 'returnDrivers'
  | 'leverage'
  | 'valuation'
  | 'accounting'

export type McqChoice = {
  id: string
  text: string
}

export type TechnicalQuestion = {
  id: string
  difficulty: Difficulty
  topic: TechnicalTopic
  prompt: string
  kind: 'mcq' | 'numeric'
  choices?: McqChoice[]
  correctChoiceId?: string
  correctValue?: number
  tolerance?: number
  explanation: string
}

export type TechnicalGrade = {
  passed: boolean
  displayCorrect: string
  displayAttempt: string
}

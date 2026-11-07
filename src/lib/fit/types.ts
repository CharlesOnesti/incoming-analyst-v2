export type FitQuestion = {
  id: string
  prompt: string
  modelAnswer30s: string
  modelAnswer60s: string
  pitfalls: string[]
  rubricKeywords: string[]
  structureHints: string[]
}

export type FitGrade = {
  score: number
  feedback: string[]
}

export type FitAnswerLength = '30s' | '60s'

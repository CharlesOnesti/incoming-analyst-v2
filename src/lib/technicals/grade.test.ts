import { describe, expect, it } from 'vitest'
import { TECHNICAL_QUESTIONS } from './bank'
import {
  gradeQuestion,
  pickQuestion,
  questionsForDifficulty,
} from './grade'

describe('questionsForDifficulty', () => {
  it('includes only easy questions for easy', () => {
    const pool = questionsForDifficulty('easy')
    expect(pool.length).toBeGreaterThan(0)
    expect(pool.every((q) => q.difficulty === 'easy')).toBe(true)
  })

  it('includes only medium questions for medium', () => {
    const pool = questionsForDifficulty('medium')
    expect(pool.length).toBeGreaterThan(0)
    expect(pool.every((q) => q.difficulty === 'medium')).toBe(true)
  })

  it('includes the full bank for hard', () => {
    const pool = questionsForDifficulty('hard')
    expect(pool.length).toBe(TECHNICAL_QUESTIONS.length)
    expect(pool.some((q) => q.difficulty === 'easy')).toBe(true)
    expect(pool.some((q) => q.difficulty === 'medium')).toBe(true)
    expect(pool.some((q) => q.difficulty === 'hard')).toBe(true)
  })
})

describe('TECHNICAL_QUESTIONS integrity', () => {
  it('has unique ids', () => {
    const ids = TECHNICAL_QUESTIONS.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has valid MCQ and numeric shapes with matching answers', () => {
    for (const q of TECHNICAL_QUESTIONS) {
      expect(q.prompt.trim().length).toBeGreaterThan(0)
      expect(q.explanation.trim().length).toBeGreaterThan(0)
      if (q.kind === 'mcq') {
        expect(q.choices?.length).toBeGreaterThanOrEqual(4)
        expect(q.correctChoiceId).toBeTruthy()
        expect(q.choices?.some((c) => c.id === q.correctChoiceId)).toBe(true)
        expect(gradeQuestion(q, { choiceId: q.correctChoiceId }).passed).toBe(
          true,
        )
      } else {
        expect(typeof q.correctValue).toBe('number')
        expect(Number.isFinite(q.correctValue)).toBe(true)
        expect(
          gradeQuestion(q, { value: q.correctValue }).passed,
        ).toBe(true)
      }
    }
  })

  it('grades known numerics exactly', () => {
    const cases: { id: string; value: number }[] = [
      { id: 'val-entry-ev', value: 600 },
      { id: 'returns-ebitda-bridge', value: 400 },
      { id: 'returns-biws-mom', value: 2.5 },
      { id: 'returns-backsolve-ebitda', value: 150 },
      { id: 'lev-equity-check', value: 340 },
      { id: 'val-ebitda-to-equity', value: 200 },
      { id: 'acct-fcf-simple', value: 55 },
      { id: 'acct-tax-shield', value: 2.5 },
      { id: 'acct-nwc-numeric', value: -40 },
      { id: 'returns-attribution-dollars', value: 250 },
    ]
    for (const { id, value } of cases) {
      const q = TECHNICAL_QUESTIONS.find((item) => item.id === id)
      expect(q, id).toBeTruthy()
      if (!q) continue
      expect(gradeQuestion(q, { value }).passed, id).toBe(true)
    }
  })
})

describe('gradeQuestion', () => {
  it('grades MCQ by choice id', () => {
    const q = TECHNICAL_QUESTIONS.find((item) => item.id === 'returns-three-levers')
    expect(q).toBeTruthy()
    if (!q) return
    expect(gradeQuestion(q, { choiceId: 'b' }).passed).toBe(true)
    expect(gradeQuestion(q, { choiceId: 'a' }).passed).toBe(false)
  })
})

describe('pickQuestion', () => {
  it('returns a question from the difficulty pool', () => {
    for (let i = 0; i < 30; i++) {
      const easy = pickQuestion('easy')
      expect(easy.difficulty).toBe('easy')
      const medium = pickQuestion('medium')
      expect(medium.difficulty).toBe('medium')
    }
  })
})

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

  it('includes easy and medium for medium', () => {
    const pool = questionsForDifficulty('medium')
    expect(pool.some((q) => q.difficulty === 'easy')).toBe(true)
    expect(pool.some((q) => q.difficulty === 'medium')).toBe(true)
    expect(pool.every((q) => q.difficulty !== 'hard')).toBe(true)
  })

  it('includes all difficulties for hard', () => {
    const pool = questionsForDifficulty('hard')
    expect(pool.length).toBe(TECHNICAL_QUESTIONS.length)
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

  it('grades numeric within tolerance', () => {
    const q = TECHNICAL_QUESTIONS.find((item) => item.id === 'val-entry-ev')
    expect(q).toBeTruthy()
    if (!q) return
    expect(gradeQuestion(q, { value: 600 }).passed).toBe(true)
    expect(gradeQuestion(q, { value: 601 }).passed).toBe(true)
    expect(gradeQuestion(q, { value: 610 }).passed).toBe(false)
  })
})

describe('pickQuestion', () => {
  it('returns a question from the difficulty pool', () => {
    for (let i = 0; i < 20; i++) {
      const q = pickQuestion('easy')
      expect(q.difficulty).toBe('easy')
    }
  })
})

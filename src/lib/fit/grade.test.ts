import { describe, expect, it } from 'vitest'
import { FIT_QUESTIONS } from './bank'
import { gradeFitAnswer } from './grade'

describe('gradeFitAnswer', () => {
  it('scores empty answers at zero', () => {
    const q = FIT_QUESTIONS[0]
    expect(gradeFitAnswer(q, '').score).toBe(0)
  })

  it('rewards keyword coverage and reasonable length', () => {
    const q = FIT_QUESTIONS[0]
    const answer = [
      ...q.rubricKeywords,
      'I built models, led diligence, and owned communication with the deal team while learning investment judgment.',
      'That path pushed me toward private equity ownership and underwriting.',
    ].join(' ')
    const grade = gradeFitAnswer(q, answer, '60s')
    expect(grade.score).toBeGreaterThan(50)
    expect(grade.feedback.length).toBeGreaterThan(0)
  })
})

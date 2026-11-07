import { describe, expect, it } from 'vitest'
import { analyzeAnswer } from './feedback'

describe('analyzeAnswer', () => {
  it('penalizes empty answers', () => {
    const result = analyzeAnswer('', ['irr', 'leverage'])
    expect(result.score).toBeLessThan(40)
  })

  it('rewards rubric hits without filler spam', () => {
    const result = analyzeAnswer(
      'Returns come from EBITDA growth, deleveraging, and multiple expansion in an LBO.',
      ['ebitda', 'deleveraging', 'multiple'],
    )
    expect(result.score).toBeGreaterThan(50)
  })
})

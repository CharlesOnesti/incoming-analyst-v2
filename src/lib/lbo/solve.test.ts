import { describe, expect, it } from 'vitest'
import { askPoolFor, getAnswer, gradeAttempt, pickAsk } from './asks'
import {
  MAX_FOLLOW_UPS,
  applyFollowUp,
  mutateInputs,
  pickShock,
} from './shocks'
import { irrPercent, solve } from './solve'
import type { AskKind, Difficulty, LboInputs } from './types'

const sample: LboInputs = {
  entryMult: 10,
  exitMult: 10,
  ltmRev: 200,
  ebitdaMargin: 30,
  debtPercent: 50,
  intRate: 5,
  revGrowth: 5,
  taxRate: 25,
  capexPr: 5,
  nwcPr: 10,
}

describe('solve', () => {
  it('returns finite IRR plus equities, EVs, and MoM', () => {
    const result = solve(sample)
    expect(Number.isFinite(result.irr)).toBe(true)
    expect(result.financials.Revenue).toHaveLength(6)
    expect(result.financials.Revenue[0]).toBe(200)
    expect(result.returns.entryMult).toBe(10)
    expect(result.returns.exitMult).toBe(10)
    expect(result.returns.entryEv).toBe(result.returns.entryNd * 2)
    expect(result.returns.entryEquity).toBe(
      result.returns.entryEv - result.returns.entryNd,
    )
    expect(result.returns.exitEquity).toBe(
      result.returns.exitEv - result.returns.exitNd,
    )
    expect(result.returns.mom).toBeCloseTo(
      result.returns.exitEquity / result.returns.entryEquity,
      10,
    )
    expect(result.irr).toBeCloseTo(result.returns.mom ** 0.2 - 1, 10)
  })

  it('uses independent exitMult for exit EV and returns', () => {
    const compressed = solve({ ...sample, exitMult: 9 })
    const parity = solve(sample)
    expect(compressed.returns.exitMult).toBe(9)
    expect(compressed.returns.exitEv).toBeLessThan(parity.returns.exitEv)
    expect(compressed.returns.exitEquity).toBeLessThan(parity.returns.exitEquity)
    expect(compressed.irr).toBeLessThan(parity.irr)
  })
})

describe('pickAsk pools', () => {
  const cases: Array<[Difficulty, AskKind[]]> = [
    ['easy', ['irr', 'mom', 'entryEquity']],
    ['medium', ['irr', 'mom', 'entryEquity', 'exitEquity', 'yearFcf']],
    [
      'hard',
      ['irr', 'mom', 'entryEquity', 'exitEquity', 'yearFcf', 'sourcesUses'],
    ],
  ]

  it.each(cases)('%s pool matches plan', (difficulty, expected) => {
    expect(askPoolFor(difficulty)).toEqual(expected)
  })

  it('only returns kinds allowed for each difficulty', () => {
    for (const [difficulty, allowed] of cases) {
      for (let i = 0; i < 40; i++) {
        const ask = pickAsk(difficulty)
        expect(allowed).toContain(ask.kind)
        if (ask.kind === 'yearFcf') {
          expect(ask.year).toBeGreaterThanOrEqual(1)
          expect(ask.year).toBeLessThanOrEqual(5)
        }
      }
    }
  })
})

describe('gradeAttempt', () => {
  const solution = solve(sample)

  it('grades IRR within ±2.5pp', () => {
    const correct = irrPercent(solution.irr)
    expect(
      gradeAttempt({ value: correct }, solution, { kind: 'irr' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: correct + 2.4 }, solution, { kind: 'irr' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: correct + 2.5 }, solution, { kind: 'irr' }).passed,
    ).toBe(false)
  })

  it('grades MoM within ±0.1x', () => {
    const correct = getAnswer(solution, { kind: 'mom' }) as number
    expect(
      gradeAttempt({ value: correct }, solution, { kind: 'mom' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: correct + 0.09 }, solution, { kind: 'mom' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: correct + 0.1 }, solution, { kind: 'mom' }).passed,
    ).toBe(false)
  })

  it('grades dollar asks within ±2', () => {
    const entry = getAnswer(solution, { kind: 'entryEquity' }) as number
    expect(
      gradeAttempt({ value: entry }, solution, { kind: 'entryEquity' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: entry + 1 }, solution, { kind: 'entryEquity' })
        .passed,
    ).toBe(true)
    expect(
      gradeAttempt({ value: entry + 2 }, solution, { kind: 'entryEquity' })
        .passed,
    ).toBe(false)

    const yearAsk = { kind: 'yearFcf' as const, year: 3 as const }
    const fcf = getAnswer(solution, yearAsk) as number
    expect(gradeAttempt({ value: fcf }, solution, yearAsk).passed).toBe(true)
    expect(gradeAttempt({ value: fcf + 2 }, solution, yearAsk).passed).toBe(
      false,
    )
  })

  it('grades sources & uses on all three fields', () => {
    const answer = getAnswer(solution, { kind: 'sourcesUses' }) as {
      entryEv: number
      debt: number
      equity: number
    }
    expect(
      gradeAttempt(answer, solution, { kind: 'sourcesUses' }).passed,
    ).toBe(true)
    expect(
      gradeAttempt(
        { ...answer, equity: answer.equity + 2 },
        solution,
        { kind: 'sourcesUses' },
      ).passed,
    ).toBe(false)
  })
})

describe('shocks and follow-ups', () => {
  it('mutates exit multiple independently', () => {
    const down = mutateInputs(sample, pickShock(['exitMultUp']))
    // Force a known shock
    const shocked = mutateInputs(sample, {
      id: 'exitMultDown',
      label: 'exit multiple −1.0x',
      apply: (inputs) => ({ ...inputs, exitMult: inputs.exitMult - 1 }),
    })
    expect(shocked.exitMult).toBe(9)
    expect(shocked.entryMult).toBe(10)
    void down
  })

  it('applyFollowUp returns a graded-ready scenario distinct from base', () => {
    expect(MAX_FOLLOW_UPS).toBe(2)
    const followUp = applyFollowUp(sample)
    expect(followUp.shock.id).toBeTruthy()
    expect(followUp.promptText).toContain('Holding all other assumptions constant')
    expect(['irr', 'mom', 'exitEquity']).toContain(followUp.ask.kind)

    const base = solve(sample)
    const correct = getAnswer(followUp.solution, followUp.ask)
    if (typeof correct === 'number') {
      expect(
        gradeAttempt({ value: correct }, followUp.solution, followUp.ask)
          .passed,
      ).toBe(true)
    }

    // Avoid trivial identical solve when shock clamps away — still usually different
    if (followUp.inputs.exitMult !== sample.exitMult) {
      expect(followUp.solution.returns.exitEv).not.toBe(base.returns.exitEv)
    }
  })

  it('excludes already-used shocks when possible', () => {
    const first = applyFollowUp(sample)
    const second = applyFollowUp(sample, [first.shock.id])
    expect(second.shock.id).not.toBe(first.shock.id)
  })
})

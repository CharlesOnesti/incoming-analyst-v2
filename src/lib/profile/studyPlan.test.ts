import { beforeEach, describe, expect, it } from 'vitest'
import { clearMemoryStore } from '../storage/local'
import { emptyProfile } from './defaults'
import { saveProfile } from './persistence'
import { buildStudyPlan } from './studyPlan'

describe('buildStudyPlan', () => {
  beforeEach(() => {
    clearMemoryStore()
  })

  it('returns default practice when profile is empty', () => {
    const plan = buildStudyPlan()
    expect(plan.length).toBeGreaterThan(0)
    expect(plan[0].href).toBeTruthy()
  })

  it('prioritizes explicit weak areas', () => {
    saveProfile({
      ...emptyProfile(),
      weakAreas: ['judgment', 'fit'],
    })
    const plan = buildStudyPlan()
    expect(plan.some((a) => a.href === '/judgment')).toBe(true)
    expect(plan.some((a) => a.href === '/fit')).toBe(true)
  })
})

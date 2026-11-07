import type {
  CandidateProfile,
  ReadinessScores,
} from './types'

export function emptyProfile(): CandidateProfile {
  return {
    id: crypto.randomUUID(),
    displayName: '',
    education: '',
    experienceSummary: '',
    targetFirms: '',
    recruitingStage: 'exploring',
    weakAreas: [],
    careerTrack: 'pe',
    updatedAt: new Date().toISOString(),
  }
}

export function emptyReadiness(): ReadinessScores {
  return {
    fit: 0,
    technicals: 0,
    deals: 0,
    lbo: 0,
    judgment: 0,
    modeling: 0,
    cases: 0,
  }
}

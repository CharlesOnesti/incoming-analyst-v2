export type RecruitingStage =
  | 'exploring'
  | 'networking'
  | 'applying'
  | 'interviewing'
  | 'offer'

export type ReadinessDimension =
  | 'fit'
  | 'technicals'
  | 'deals'
  | 'lbo'
  | 'judgment'
  | 'modeling'
  | 'cases'

export type CandidateProfile = {
  id: string
  displayName: string
  education: string
  experienceSummary: string
  targetFirms: string
  recruitingStage: RecruitingStage
  weakAreas: ReadinessDimension[]
  careerTrack: 'pe' | 'ib' | 'growth' | 'credit' | 'hf'
  updatedAt: string
}

export type PracticeSessionRecord = {
  id: string
  mode: string
  difficulty?: string
  score?: number
  total?: number
  dimension?: ReadinessDimension
  notes?: string
  createdAt: string
}

export type CalendarItem = {
  id: string
  title: string
  kind: 'interview' | 'deadline' | 'prep' | 'outreach'
  date: string
  firm?: string
  notes?: string
}

export type DebriefRecord = {
  id: string
  firm: string
  date: string
  stage: string
  questionsAsked: string
  selfNotes: string
  practiceNext: string
  createdAt: string
}

export type ReadinessScores = Record<ReadinessDimension, number>

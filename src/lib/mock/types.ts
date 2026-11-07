export type InterviewPersona = 'associate' | 'vp' | 'partner' | 'headhunter'

export type InterviewMode = 'fit' | 'technical' | 'deal' | 'mixed' | 'judgment'

export type MockTurn = {
  role: 'interviewer' | 'candidate' | 'feedback'
  text: string
}

export type MockSession = {
  id: string
  mode: InterviewMode
  persona: InterviewPersona
  turns: MockTurn[]
  score?: number
  createdAt: string
}

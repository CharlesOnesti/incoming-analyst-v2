export type StoryDraft = {
  id: string
  versionLabel: string
  background: string
  motivations: string
  experiences: string
  interests: string
  differentiators: string
  updatedAt: string
}

export type ResumeDraft = {
  id: string
  versionLabel: string
  education: string
  experienceBullets: string[]
  skills: string[]
  targetRole: string
  updatedAt: string
}

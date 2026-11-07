import type { ResumeDraft, StoryDraft } from './types'

export const STORY_SECTION_GUIDES: Record<
  'background' | 'motivations' | 'experiences' | 'interests' | 'differentiators',
  { title: string; prompt: string; tips: string[] }
> = {
  background: {
    title: 'Background',
    prompt:
      'Where did you grow up, study, and form the habits that show up in your work today?',
    tips: [
      'One short hook, not a biography',
      'Connect background to analytical or leadership traits',
    ],
  },
  motivations: {
    title: 'Motivations',
    prompt: 'Why PE, why now, and what kind of investor do you want to become?',
    tips: [
      'Contrast with banking, markets, or corp fin if relevant',
      'Tie motivation to ownership and underwriting',
    ],
  },
  experiences: {
    title: 'Experiences',
    prompt:
      'Which 2–3 experiences best prove you can model, diligence, and communicate?',
    tips: [
      'Lead with impact, not task lists',
      'Quantify where honest',
    ],
  },
  interests: {
    title: 'Interests / sectors',
    prompt: 'What industries or business models do you naturally dig into?',
    tips: [
      'Be specific enough to sound real',
      'Link interests to deal examples or reading',
    ],
  },
  differentiators: {
    title: 'Differentiators',
    prompt: 'What should interviewers remember about you after 20 candidates?',
    tips: [
      'Prefer proof over adjectives',
      'Keep to 2 memorable points',
    ],
  },
}

export const RESUME_BULLET_PROMPTS: string[] = [
  'Start with a strong verb and end with a metric or decision impact.',
  'Prefer “Built LBO that… / Led diligence workstream that…” over “Responsible for…”.',
  'Include tools only when they clarify scope (Excel, SQL, dataroom), not as filler.',
  'Align bullets to the target role: modeling, diligence, communication, judgment.',
]

export function emptyStoryDraft(versionLabel = 'v1'): StoryDraft {
  const now = new Date().toISOString()
  return {
    id: `story-${Date.now()}`,
    versionLabel,
    background: '',
    motivations: '',
    experiences: '',
    interests: '',
    differentiators: '',
    updatedAt: now,
  }
}

export function emptyResumeDraft(versionLabel = 'v1'): ResumeDraft {
  const now = new Date().toISOString()
  return {
    id: `resume-${Date.now()}`,
    versionLabel,
    education: '',
    experienceBullets: [],
    skills: [],
    targetRole: 'Private Equity Analyst / Associate',
    updatedAt: now,
  }
}

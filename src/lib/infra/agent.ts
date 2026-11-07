import { buildStudyPlan } from '../profile/studyPlan'
import { loadProfile, loadReadiness } from '../profile/persistence'
import { getLlmProvider, type LlmProvider } from './llm'

export type AgentBrainOptions = {
  llm?: LlmProvider
}

export class AgentBrain {
  private llm: LlmProvider

  constructor(options: AgentBrainOptions = {}) {
    this.llm = options.llm ?? getLlmProvider()
  }

  getProfileSummary(): string {
    const profile = loadProfile()
    const readiness = loadReadiness()
    const weak = Object.entries(readiness)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .map(([dim, score]) => `${dim} ${score}%`)
      .join(', ')

    return [
      `${profile.displayName || 'Candidate'} · ${profile.careerTrack.toUpperCase()} · ${profile.recruitingStage}`,
      profile.experienceSummary || 'No experience summary yet.',
      `Targets: ${profile.targetFirms || 'not set'}`,
      `Weakest readiness: ${weak || 'n/a'}`,
    ].join('\n')
  }

  recommendPractice(): string {
    const plan = buildStudyPlan()
    if (plan.length === 0) {
      return 'No practice actions yet — complete your profile weak areas.'
    }
    return plan
      .slice(0, 5)
      .map((a, i) => `${i + 1}. ${a.title} — ${a.reason} (${a.href})`)
      .join('\n')
  }

  async draftOutreach(context: string): Promise<string> {
    return this.llm.complete(
      `Draft a short PE recruiting outreach note.\nContext: ${context}`,
      'You are a PE recruiting coach. Be concise and specific.',
    )
  }

  async researchBrief(firmName: string): Promise<string> {
    return this.llm.complete(
      `Research brief for firm: ${firmName}`,
      'Summarize strategy, sectors, and interview angles at a high level.',
    )
  }
}

export function createAgentBrain(options?: AgentBrainOptions): AgentBrain {
  return new AgentBrain(options)
}

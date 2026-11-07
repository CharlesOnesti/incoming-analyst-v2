export type LlmProvider = {
  name: string
  complete(prompt: string, system?: string): Promise<string>
}

const COACHING_SNIPPETS = [
  'Lead with the investment thesis, then support with 2–3 facts.',
  'Quantify your role: model ownership, diligence workstream, or recommendation.',
  'Name the key risk and how you would diligence it before the IC.',
  'Bridge returns: entry multiple, margin, growth, and debt paydown.',
  'Close with a clear recommendation and what would change your mind.',
]

export class HeuristicProvider implements LlmProvider {
  name = 'heuristic'

  async complete(prompt: string, system?: string): Promise<string> {
    const lower = prompt.toLowerCase()
    const picks: string[] = []

    if (system) {
      picks.push(`(Coach mode: ${system.slice(0, 120)}${system.length > 120 ? '…' : ''})`)
    }

    if (lower.includes('outreach') || lower.includes('email')) {
      picks.push(
        'Keep outreach under 120 words: context → why them → one specific ask → soft close.',
      )
    } else if (lower.includes('firm') || lower.includes('research')) {
      picks.push(
        'Brief structure: strategy → recent deals → differentiating edge → interview angles.',
      )
    } else if (lower.includes('lbo') || lower.includes('model')) {
      picks.push(
        'Walk sources & uses, FCF drivers, and exit returns; call one sensitivity that matters.',
      )
    } else {
      picks.push(COACHING_SNIPPETS[prompt.length % COACHING_SNIPPETS.length])
    }

    picks.push(
      `Reflecting on your prompt (${prompt.trim().slice(0, 80)}${prompt.length > 80 ? '…' : ''}): stay concrete, avoid filler, and end with a decision.`,
    )

    return picks.join('\n\n')
  }
}

export class RemoteLlmProvider implements LlmProvider {
  name = 'remote'
  private url: string

  constructor(url: string) {
    this.url = url
  }

  async complete(_prompt: string, _system?: string): Promise<string> {
    if (!this.url) {
      return 'Configure VITE_LLM_API_URL'
    }
    throw new Error(
      'Remote LLM is stubbed. Configure VITE_LLM_API_URL and wire the HTTP client.',
    )
  }
}

export function getLlmProvider(): LlmProvider {
  const url =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_LLM_API_URL as string | undefined)
      : undefined

  if (url && String(url).trim()) {
    return new RemoteLlmProvider(String(url).trim())
  }
  return new HeuristicProvider()
}

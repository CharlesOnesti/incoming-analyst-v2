import { readJson, writeJson } from '../storage/local'

const EXPERT_KEY = 'incoming-analyst:expert-contributions'

export type ExpertContribution = {
  id: string
  author: string
  topic: string
  body: string
  createdAt: string
}

export function loadContributions(): ExpertContribution[] {
  return readJson<ExpertContribution[]>(EXPERT_KEY, [])
}

export function saveContributions(items: ExpertContribution[]): void {
  writeJson(EXPERT_KEY, items)
}

export function addContribution(
  input: Omit<ExpertContribution, 'id' | 'createdAt'> & {
    id?: string
    createdAt?: string
  },
): ExpertContribution {
  const item: ExpertContribution = {
    id:
      input.id ??
      `exp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    author: input.author,
    topic: input.topic,
    body: input.body,
    createdAt: input.createdAt ?? new Date().toISOString(),
  }
  const items = loadContributions()
  items.unshift(item)
  saveContributions(items)
  return item
}

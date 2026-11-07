export type IntegrationId =
  | 'gmail'
  | 'outlook'
  | 'drive'
  | 'docs'
  | 'calendar'
  | 'tracker'

export type IntegrationStatus = {
  id: IntegrationId
  connected: boolean
  mode: 'live' | 'mock' | 'disconnected'
}

const DEFAULTS: IntegrationStatus[] = [
  { id: 'gmail', connected: false, mode: 'disconnected' },
  { id: 'outlook', connected: false, mode: 'disconnected' },
  { id: 'drive', connected: false, mode: 'disconnected' },
  { id: 'docs', connected: false, mode: 'disconnected' },
  { id: 'calendar', connected: false, mode: 'disconnected' },
  { id: 'tracker', connected: true, mode: 'mock' },
]

let state: IntegrationStatus[] = DEFAULTS.map((d) => ({ ...d }))

export function listIntegrations(): IntegrationStatus[] {
  return state.map((s) => ({ ...s }))
}

export function connectMock(id: IntegrationId): IntegrationStatus[] {
  state = state.map((s) =>
    s.id === id ? { ...s, connected: true, mode: 'mock' } : s,
  )
  return listIntegrations()
}

export function disconnect(id: IntegrationId): IntegrationStatus[] {
  state = state.map((s) =>
    s.id === id ? { ...s, connected: false, mode: 'disconnected' } : s,
  )
  return listIntegrations()
}

export function resetIntegrations(): void {
  state = DEFAULTS.map((d) => ({ ...d }))
}

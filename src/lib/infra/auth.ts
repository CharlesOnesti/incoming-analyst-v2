import { STORAGE_KEYS } from '../storage/keys'
import { readJson, removeKey, writeJson } from '../storage/local'

export type LocalAuthUser = {
  id: string
  email: string
  displayName: string
}

export function getUser(): LocalAuthUser | null {
  return readJson<LocalAuthUser | null>(STORAGE_KEYS.auth, null)
}

export function signIn(email: string, name: string): LocalAuthUser {
  const user: LocalAuthUser = {
    id: `user-${email.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    email: email.trim(),
    displayName: name.trim() || email.trim(),
  }
  writeJson(STORAGE_KEYS.auth, user)
  return user
}

export function signOut(): void {
  removeKey(STORAGE_KEYS.auth)
}

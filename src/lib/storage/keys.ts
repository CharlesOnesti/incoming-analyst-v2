export const STORAGE_PREFIX = 'incoming-analyst:'

export const STORAGE_KEYS = {
  profile: `${STORAGE_PREFIX}profile`,
  sessions: `${STORAGE_PREFIX}sessions`,
  deals: `${STORAGE_PREFIX}deals`,
  stories: `${STORAGE_PREFIX}stories`,
  resumes: `${STORAGE_PREFIX}resumes`,
  calendar: `${STORAGE_PREFIX}calendar`,
  debriefs: `${STORAGE_PREFIX}debriefs`,
  mocks: `${STORAGE_PREFIX}mocks`,
  tracker: `${STORAGE_PREFIX}tracker`,
  settings: `${STORAGE_PREFIX}settings`,
  auth: `${STORAGE_PREFIX}auth`,
  readiness: `${STORAGE_PREFIX}readiness`,
} as const

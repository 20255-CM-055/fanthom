import { readMeetingState, writeMeetingState } from './meetingState'

export const PREFERENCES_STORAGE_KEY = 'fathom:app-preferences'
export const CALENDAR_STORAGE_KEY = 'fathom:calendar-connections'
export const SUMMARY_TEMPLATE_IDS = ['general', 'projectUpdate', 'sales', 'oneOnOne']

export const DEFAULT_PREFERENCES = {
  autoRecord: true,
  platforms: { zoom: true, googleMeet: true, teams: false },
  consentMode: 'announce',
  defaultSummaryTemplate: 'general',
  automaticActionItems: true,
  summaryStyle: 'balanced',
  defaultVisibility: 'private',
  shareSummaryAndRecording: false,
  shareHighlights: false,
}

export function getPreferences() {
  const stored = readMeetingState(PREFERENCES_STORAGE_KEY, {})
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return DEFAULT_PREFERENCES
  const platforms = stored.platforms
  return {
    ...DEFAULT_PREFERENCES,
    ...stored,
    platforms: platforms && typeof platforms === 'object' && !Array.isArray(platforms)
      ? { ...DEFAULT_PREFERENCES.platforms, ...platforms }
      : DEFAULT_PREFERENCES.platforms,
    defaultSummaryTemplate: SUMMARY_TEMPLATE_IDS.includes(stored.defaultSummaryTemplate)
      ? stored.defaultSummaryTemplate
      : DEFAULT_PREFERENCES.defaultSummaryTemplate,
  }
}

export function savePreferences(preferences) {
  return writeMeetingState(PREFERENCES_STORAGE_KEY, preferences)
}

export const DEFAULT_CALENDAR_CONNECTIONS = {
  google: { connected: true, lastSyncedAt: new Date(Date.now() - 7 * 60_000).toISOString() },
  microsoft: { connected: false, lastSyncedAt: null },
}

export function getCalendarConnections() {
  const stored = readMeetingState(CALENDAR_STORAGE_KEY, {})
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return DEFAULT_CALENDAR_CONNECTIONS
  return Object.fromEntries(
    Object.entries(DEFAULT_CALENDAR_CONNECTIONS).map(([provider, defaults]) => {
      const saved = stored[provider]
      return [provider, saved && typeof saved === 'object' && !Array.isArray(saved)
        ? { ...defaults, ...saved, connected: Boolean(saved.connected) }
        : defaults]
    }),
  )
}

export function saveCalendarConnections(connections) {
  return writeMeetingState(CALENDAR_STORAGE_KEY, connections)
}

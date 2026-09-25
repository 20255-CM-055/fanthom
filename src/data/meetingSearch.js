import { getMeetingExperience, getMeetings } from './meetings.js'

function normalize(value) {
  return value.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, ' ')
}

function formatTimestamp(seconds) {
  const whole = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const remainder = whole % 60
  if (hours > 0) {
    return [hours, minutes, remainder].map((part) => String(part).padStart(2, '0')).join(':')
  }
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

function getIndexedMeetings() {
  return getMeetings().map((meeting) => getMeetingExperience(meeting))
}

export function searchMeetingTranscripts(query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return []

  return getIndexedMeetings()
    .flatMap((meeting) => meeting.transcript.map((segment) => ({ meeting, segment })))
    .filter(({ segment }) => {
      const searchable = normalize(`${segment.speaker} ${segment.text}`)
      return terms.every((term) => searchable.includes(term))
    })
    .map(({ meeting, segment }) => ({
      meetingId: meeting.id,
      meetingTitle: meeting.title,
      date: meeting.date,
      speaker: segment.speaker,
      timestamp: segment.timestamp,
      time: formatTimestamp(segment.timestamp),
      segmentId: segment.id,
      snippet: segment.text,
      query: query.trim(),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date) || a.timestamp - b.timestamp)
}

function makeActionItemReference(meeting, item, query) {
  const segment = meeting.transcript.find(({ speaker, text }) => {
    const actionTerms = normalize(item.text).split(/\s+/).filter((term) => term.length > 4)
    const searchable = normalize(`${speaker} ${text}`)
    return speaker === item.owner || actionTerms.some((term) => searchable.includes(term))
  }) || meeting.transcript[0]

  return {
    meetingId: meeting.id,
    meetingTitle: meeting.title,
    date: meeting.date,
    speaker: segment.speaker,
    timestamp: segment.timestamp,
    time: formatTimestamp(segment.timestamp),
    segmentId: segment.id,
    snippet: item.text,
    query,
  }
}

function findMeetingReferences(matcher, query) {
  const references = []
  const indexedMeetings = getIndexedMeetings()
  for (const meeting of indexedMeetings) {
    const segment = meeting.transcript.find(({ speaker, text }) => matcher.test(`${speaker} ${text}`))
    if (segment) {
      references.push({
        meetingId: meeting.id,
        meetingTitle: meeting.title,
        date: meeting.date,
        speaker: segment.speaker,
        timestamp: segment.timestamp,
        time: formatTimestamp(segment.timestamp),
        segmentId: segment.id,
        snippet: segment.text,
        query,
      })
    }
  }
  return references.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function answerMeetingQuestion(question) {
  const query = question.trim()
  const normalized = normalize(query)
  if (!normalized) return null

  if (/\bsso\b/.test(normalized)) {
    const references = findMeetingReferences(/\bsso\b/i, 'SSO')
    return references.length
      ? {
          intent: 'sso',
          answer: `SSO came up in ${references.length} ${references.length === 1 ? 'meeting' : 'meetings'}. The conversations focused on rollout ownership, migration planning, and sign-in reliability.`,
          references,
        }
      : null
  }

  if (/\b(open|outstanding|remaining|incomplete|uncompleted)\b/.test(normalized) && /\b(action|actions|items|tasks|follow up|followups)\b/.test(normalized)) {
    const references = getIndexedMeetings().flatMap((meeting) => {
      let completed = {}
      try {
        completed = JSON.parse(window.localStorage.getItem(`fathom:completed-actions:${meeting.id}`) || '{}')
      } catch {
        completed = {}
      }
      return meeting.actionItems
        .filter((item) => !completed[item.id])
        .map((item) => makeActionItemReference(meeting, item, ''))
    })
    return {
      intent: 'open-actions',
      answer: `There are ${references.length} open action ${references.length === 1 ? 'item' : 'items'} across your meetings. Here are the outstanding follow-ups and owners.`,
      references: references.slice(0, 30),
    }
  }

  if (/\bcustomer(s)?\b/.test(normalized) && /\bonboarding\b/.test(normalized)) {
    const indexedMeetings = getIndexedMeetings()
    const references = findMeetingReferences(/\bonboarding\b/i, 'onboarding')
      .filter(({ meetingId }) => {
        const meeting = indexedMeetings.find((item) => item.id === meetingId)
        return meeting?.type === 'Customer Call' || meeting?.title.includes('Customer')
      })
    return references.length
      ? {
          intent: 'customer-onboarding',
          answer: `Customers described onboarding friction around handoffs, setup guidance, and knowing who owns the next step.`,
          references,
        }
      : null
  }

  return null
}

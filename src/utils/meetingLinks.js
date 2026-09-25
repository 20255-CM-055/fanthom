export function meetingTimestampUrl(result) {
  const params = new URLSearchParams()
  params.set('tab', 'transcript')
  params.set('t', String(result.timestamp))
  params.set('segment', result.segmentId)
  if (result.query) params.set('q', result.query)
  return `/calls/${result.meetingId}?${params.toString()}`
}

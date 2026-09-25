import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  ListChecks,
  Share2,
  Sparkles,
  Video,
} from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { MeetingHighlightsWorkspace } from '../components/MeetingHighlightsWorkspace'
import { MeetingPlayer } from '../components/MeetingPlayer'
import { MeetingSummaryWorkspace } from '../components/MeetingSummaryWorkspace'
import { AddHighlightModal, ShareHighlightModal } from '../components/MeetingOverlays'
import { ParticipantAvatars } from '../components/ParticipantAvatars'
import { TranscriptWorkspace } from '../components/TranscriptWorkspace'
import { getMeetingById, getMeetingExperience } from '../data/meetings'
import { getPreferences, SUMMARY_TEMPLATE_IDS } from '../utils/appPreferences'
import { formatClock, readMeetingState, toClockSeconds, writeMeetingState } from '../utils/meetingState'
import '../styles/meeting-detail.css'

const meetingTabs = [
  { id: 'summary', label: 'Summary', icon: Sparkles },
  { id: 'transcript', label: 'Transcript', icon: FileText },
  { id: 'highlights', label: 'Highlights', icon: CheckCircle2 },
]

function MeetingDetailContent({ meeting, searchParams }) {
  const actionStorageKey = `fathom:completed-actions:${meeting.id}`
  const highlightStorageKey = `fathom:custom-highlights:${meeting.id}`
  const requestedTime = toClockSeconds(searchParams.get('t'))
  const initialSegmentId = searchParams.get('segment')
  const [currentTime, setCurrentTime] = useState(() => Math.min(requestedTime ?? 0, meeting.durationSeconds))
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTab, setSelectedTab] = useState(() => searchParams.get('tab') === 'transcript' ? 'transcript' : 'summary')
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const preferred = getPreferences().defaultSummaryTemplate
    return SUMMARY_TEMPLATE_IDS.includes(preferred) && meeting.summaryTemplates[preferred]
      ? preferred
      : 'general'
  })
  const [transcriptSearch, setTranscriptSearch] = useState(() => searchParams.get('q') || '')
  const [storageWarning, setStorageWarning] = useState('')
  const [completedActions, setCompletedActions] = useState(() => {
    const saved = readMeetingState(actionStorageKey, {})
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
  })
  const [customHighlights, setCustomHighlights] = useState(() => {
    const saved = readMeetingState(highlightStorageKey, [])
    return Array.isArray(saved) ? saved : []
  })
  const [highlightDraft, setHighlightDraft] = useState(null)
  const [shareTarget, setShareTarget] = useState(null)
  const transcriptContainerRef = useRef(null)
  const duration = meeting.durationSeconds

  const highlights = useMemo(
    () => [...meeting.highlights, ...customHighlights].sort((a, b) => a.timestamp - b.timestamp),
    [customHighlights, meeting.highlights],
  )
  const activeSegment = useMemo(
    () => [...meeting.transcript].reverse().find((segment) => segment.timestamp <= currentTime) || meeting.transcript[0],
    [currentTime, meeting.transcript],
  )

  useEffect(() => {
    if (!writeMeetingState(actionStorageKey, completedActions)) {
      setStorageWarning('Changes could not be saved in this browser. Keep this tab open to preserve them.')
    }
  }, [actionStorageKey, completedActions])

  useEffect(() => {
    if (!writeMeetingState(highlightStorageKey, customHighlights)) {
      setStorageWarning('Changes could not be saved in this browser. Keep this tab open to preserve them.')
    }
  }, [customHighlights, highlightStorageKey])

  useEffect(() => {
    if (selectedTab !== 'transcript' || !activeSegment) return
    const activeElement = document.getElementById(`transcript-${activeSegment.id}`)
    const container = transcriptContainerRef.current
    if (!activeElement || !container) return
    const activeRect = activeElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
      container.scrollTo({
        top: container.scrollTop + activeRect.top - containerRect.top - 16,
        behavior: 'smooth',
      })
    }
  }, [activeSegment, selectedTab, transcriptSearch])

  const stopPlayback = useCallback(() => setIsPlaying(false), [])

  function togglePlayback() {
    if (currentTime >= duration) setCurrentTime(0)
    setIsPlaying((playing) => !playing)
  }

  function toggleAction(actionId) {
    setCompletedActions((current) => ({ ...current, [actionId]: !current[actionId] }))
  }

  function jumpToHighlight(highlight) {
    setCurrentTime(highlight.timestamp)
    setTranscriptSearch('')
    setSelectedTab('transcript')
  }

  function saveHighlight(highlight) {
    setCustomHighlights((current) => [...current, highlight].sort((a, b) => a.timestamp - b.timestamp))
    setHighlightDraft(null)
  }

  const dateTime = new Date(meeting.date)
  const isToday = dateTime.toDateString() === new Date().toDateString()
  const todayTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(dateTime)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: isToday ? undefined : 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateTime)

  return (
    <div className="page detail-page meeting-detail-page">
      <Link className="back-link detail-back-link" to="/calls"><ArrowLeft size={15} />Back to My Calls</Link>

      <header className="meeting-detail-header">
        <div className="meeting-detail-title-area">
          <div className="meeting-detail-kicker"><span className="meeting-type-pill"><Video size={13} />{meeting.type}</span><span className="meeting-ready"><span />Recording ready</span></div>
          <h1>{meeting.title}</h1>
          <div className="meeting-detail-metadata">
            <span>{isToday ? `Today · ${todayTime}` : formattedDate}</span>
            <span className="detail-meta-separator" />
            <span><Clock3 size={13} />{formatClock(duration)}</span>
            <span className="detail-meta-separator" />
            <span><ListChecks size={13} />{meeting.participants.length} participants</span>
          </div>
        </div>
        <div className="meeting-detail-actions">
          <div className="meeting-detail-attendees">
            <ParticipantAvatars participants={meeting.participants} limit={5} />
            <span>{meeting.participants.length} people</span>
          </div>
          <button
            className="meeting-share-button"
            type="button"
            onClick={() => setShareTarget(highlights[0] || null)}
            disabled={!highlights.length}
          >
            <Share2 size={15} />Share
          </button>
        </div>
      </header>

      <MeetingPlayer
        meeting={meeting}
        currentTime={currentTime}
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        onSeek={setCurrentTime}
        onPlaybackEnd={stopPlayback}
        highlights={highlights}
        activeSpeaker={activeSegment?.speaker}
      />

      <nav className="meeting-tabs" aria-label="Meeting details" role="tablist">
        {meetingTabs.map(({ id, label, icon: Icon }) => (
          <button
            className={`meeting-tab${selectedTab === id ? ' is-selected' : ''}`}
            key={id}
            type="button"
            role="tab"
            aria-selected={selectedTab === id}
            aria-controls={`meeting-panel-${id}`}
            id={`meeting-tab-${id}`}
            onClick={() => setSelectedTab(id)}
          >
            <Icon size={15} />
            {label}
            {id === 'highlights' && <span className="tab-count">{highlights.length}</span>}
          </button>
        ))}
        <span className="meeting-tabs-context"><span className="tabs-context-dot" />Saved to My Calls</span>
      </nav>
      {storageWarning && <p className="storage-warning" role="status">{storageWarning}</p>}

      <div
        className="meeting-tab-panel"
        id={`meeting-panel-${selectedTab}`}
        role="tabpanel"
        aria-labelledby={`meeting-tab-${selectedTab}`}
      >
        {selectedTab === 'summary' && (
          <MeetingSummaryWorkspace
            meeting={meeting}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            completed={completedActions}
            onToggleAction={toggleAction}
            onSeek={(timestamp) => jumpToHighlight({ timestamp })}
            highlights={highlights}
          />
        )}
        {selectedTab === 'transcript' && (
          <TranscriptWorkspace
            transcript={meeting.transcript}
            currentTime={currentTime}
            activeSegmentId={activeSegment?.id}
            focusedSegmentId={initialSegmentId}
            search={transcriptSearch}
            containerRef={transcriptContainerRef}
            onSearchChange={setTranscriptSearch}
            onSeek={setCurrentTime}
            onAddHighlight={setHighlightDraft}
          />
        )}
        {selectedTab === 'highlights' && (
          <MeetingHighlightsWorkspace
            highlights={highlights}
            onSeek={jumpToHighlight}
            onShare={setShareTarget}
          />
        )}
      </div>

      {highlightDraft && (
        <AddHighlightModal
          meeting={meeting}
          segment={highlightDraft}
          onClose={() => setHighlightDraft(null)}
          onSave={saveHighlight}
        />
      )}
      {shareTarget && <ShareHighlightModal meeting={meeting} highlight={shareTarget} onClose={() => setShareTarget(null)} />}
    </div>
  )
}

export function MeetingDetailPage() {
  const { meetingId } = useParams()
  const [searchParams] = useSearchParams()
  const meeting = getMeetingById(meetingId)

  if (!meeting) {
    return (
      <div className="page not-found-page">
        <span className="meeting-recording-icon"><Video size={19} /></span>
        <h1>Call not found</h1>
        <p>This meeting may have been removed or the link may be incorrect.</p>
        <Link className="primary-button" to="/calls"><ArrowLeft size={16} />Back to My Calls</Link>
      </div>
    )
  }
  const targetSegment = searchParams.get('segment')
  const matchingSegment = targetSegment && getMeetingExperience(meeting).transcript.some((segment) => segment.id === targetSegment)

  return (
    <MeetingDetailContent
      key={`${meeting.id}-${searchParams.toString()}`}
      meeting={getMeetingExperience(meeting)}
      searchParams={matchingSegment ? searchParams : new URLSearchParams()}
    />
  )
}

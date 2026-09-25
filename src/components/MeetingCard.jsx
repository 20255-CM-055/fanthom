import { ArrowUpRight, Clock3, Users, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ParticipantAvatars } from './ParticipantAvatars'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

export function formatMeetingDate(date) {
  const dateValue = new Date(date)
  return `${dateFormatter.format(dateValue)} · ${timeFormatter.format(dateValue)}`
}

export function formatDuration(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60
  if (hours === 0) return `${minutes} min`
  if (minutes === 0) return `${hours} hr`
  return `${hours} hr ${minutes} min`
}

export function MeetingCard({ meeting, featured = false }) {
  return (
    <Link
      to={`/calls/${meeting.id}`}
      className={`meeting-card${featured ? ' featured' : ''}`}
      aria-label={`Open ${meeting.title}, ${formatMeetingDate(meeting.date)}`}
    >
      <div className="meeting-card-main">
        <div className={`meeting-recording-icon${featured ? ' featured-icon' : ''}`}>
          <Video size={18} strokeWidth={1.8} />
        </div>
        <div className="meeting-info">
          <div className="meeting-title-line">
            <h3>{meeting.title}</h3>
            {featured && <span className="recent-badge">Latest</span>}
          </div>
          <div className="meeting-subline">
            <span>{formatMeetingDate(meeting.date)}</span>
            <span className="subline-dot">·</span>
            <span className="meeting-type">{meeting.type}</span>
          </div>
        </div>
        <span className="recording-status"><span className="status-dot" />{meeting.status}</span>
      </div>
      <div className="meeting-card-meta">
        <div className="meeting-participants">
          <ParticipantAvatars participants={meeting.participants} />
          <span><Users size={14} />{meeting.participants.length}</span>
        </div>
        <span className="meeting-duration"><Clock3 size={14} />{formatDuration(meeting.durationMinutes)}</span>
        <span className="meeting-open-icon" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </div>
    </Link>
  )
}

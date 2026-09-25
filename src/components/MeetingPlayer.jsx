import { useEffect, useRef, useState } from 'react'
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { initials } from './ParticipantAvatars'
import { formatClock } from '../utils/meetingState'

const speeds = [0.75, 1, 1.25, 1.5, 2]

export function MeetingPlayer({
  meeting,
  currentTime,
  isPlaying,
  onTogglePlayback,
  onSeek,
  onPlaybackEnd,
  highlights,
  activeSpeaker,
}) {
  const duration = meeting.durationSeconds || meeting.durationMinutes * 60
  const [muted, setMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const currentTimeRef = useRef(currentTime)
  currentTimeRef.current = currentTime

  useEffect(() => {
    if (!isPlaying) return undefined
    const timer = window.setInterval(() => {
      const nextTime = Math.min(currentTimeRef.current + speed, duration)
      currentTimeRef.current = nextTime
      onSeek(nextTime)
      if (nextTime >= duration) {
        window.clearInterval(timer)
        onPlaybackEnd()
      }
    }, 1000)
    return () => window.clearInterval(timer)
  }, [duration, isPlaying, onPlaybackEnd, onSeek, speed])

  function handleSeek(event) {
    onSeek(Number(event.target.value))
  }

  return (
    <section className={`player-card${expanded ? ' player-expanded' : ''}`} aria-label="Meeting playback">
      <div className="player-stage">
        <div className="stage-topline">
          <span className="stage-status"><span />RECORDING READY</span>
          <span className="stage-date">{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(meeting.date))}</span>
        </div>
        <div className="stage-visual">
          <div className="stage-orbit stage-orbit-one" />
          <div className="stage-orbit stage-orbit-two" />
          <div className="stage-logo" aria-hidden="true"><span /><span /><span /></div>
          <div className="speaker-grid">
            {meeting.participants.slice(0, 4).map((participant, index) => (
              <div
                className={`speaker-tile${participant.name === activeSpeaker ? ' active-speaker' : ''}`}
                key={participant.name}
              >
                <span className={`speaker-avatar speaker-tone-${index}`}>{initials(participant.name)}</span>
                <span className="speaker-name">{participant.name.split(' ')[0]} {participant.name.split(' ').at(-1)?.[0]}.</span>
                {participant.name === activeSpeaker && <span className="speaking-indicator"><i /><i /><i /><i /></span>}
              </div>
            ))}
          </div>
        </div>
        <div className="stage-caption">
          <div>
            <span className="stage-eyebrow">MEETING RECAP</span>
            <strong>{meeting.title}</strong>
            <span>{activeSpeaker || meeting.participants[0].name} · {meeting.type}</span>
          </div>
          <span className="stage-recording-icon"><span /></span>
        </div>
      </div>

      <div className="player-controls">
        <div className="timeline-row">
          <div className="timeline-track">
            <div className="timeline-buffer" />
            <div className="timeline-progress" style={{ width: `${(currentTime / duration) * 100}%` }} />
            {highlights.map((highlight) => (
              <button
                className={`timeline-marker marker-${highlight.type.toLowerCase().replaceAll(' ', '-')}`}
                key={highlight.id}
                type="button"
                style={{ left: `${Math.min(100, (highlight.timestamp / duration) * 100)}%` }}
                aria-label={`Jump to ${highlight.title} at ${highlight.time}`}
                title={`${highlight.time} · ${highlight.title}`}
                onClick={() => onSeek(highlight.timestamp)}
              />
            ))}
            <input
              aria-label="Seek meeting playback"
              type="range"
              min="0"
              max={duration}
              step="1"
              value={Math.min(currentTime, duration)}
              onChange={handleSeek}
              className="timeline-input"
            />
          </div>
          <span className="timeline-time">{formatClock(currentTime)} <span>/</span> {formatClock(duration)}</span>
        </div>

        <div className="transport-row">
          <div className="transport-main">
            <button
              className="player-icon-button player-play-button"
              type="button"
              onClick={onTogglePlayback}
              aria-label={isPlaying ? 'Pause playback' : 'Play playback'}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <button
              className="player-icon-button volume-button"
              type="button"
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? 'Unmute playback' : 'Mute playback'}
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <span className="player-clock">{formatClock(currentTime)}</span>
          </div>
          <div className="transport-options">
            <label className="speed-select">
              <span className="visually-hidden">Playback speed</span>
              <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Playback speed">
                {speeds.map((value) => <option value={value} key={value}>{value}×</option>)}
              </select>
            </label>
            <button
              className={`player-icon-button expand-button${expanded ? ' active' : ''}`}
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-label={expanded ? 'Restore playback size' : 'Expand playback'}
              title={expanded ? 'Restore playback size' : 'Expand playback'}
            >
              {expanded ? <Minimize size={17} /> : <Maximize size={17} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

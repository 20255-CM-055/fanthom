import { ArrowUpRight, Clock3, Play } from 'lucide-react'
import { formatClock } from '../utils/meetingState'

const typeClass = (type) => type.toLowerCase().replaceAll(' ', '-')

export function MeetingHighlightsWorkspace({ highlights, onSeek, onShare }) {
  return (
    <section className="highlights-workspace">
      <header className="highlights-workspace-header">
        <div><h2>Meeting highlights</h2><p>Important decisions, feedback, and moments worth revisiting.</p></div>
        <span className="highlights-total">{highlights.length} {highlights.length === 1 ? 'highlight' : 'highlights'}</span>
      </header>
      {highlights.length ? (
        <div className="highlight-cards">
          {highlights.map((highlight) => (
            <article className="highlight-card" key={highlight.id}>
              <button className="highlight-card-play" type="button" onClick={() => onSeek(highlight)} aria-label={`Play highlight at ${highlight.time}`}>
                <Play size={15} fill="currentColor" />
              </button>
              <div className="highlight-card-content">
                <div className="highlight-card-meta">
                  <button type="button" className="highlight-time-link" onClick={() => onSeek(highlight)}>
                    <Clock3 size={12} />{formatClock(highlight.timestamp)}
                  </button>
                  <span className={`highlight-type-badge type-${typeClass(highlight.type)}`}>{highlight.type}</span>
                </div>
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
                <blockquote>{highlight.excerpt}</blockquote>
                <button className="share-clip-button" type="button" onClick={() => onShare(highlight)}>
                  Share clip <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="highlights-empty"><span><Clock3 size={20} /></span><strong>No highlights yet</strong><p>Add a highlight from the transcript to save an important moment.</p></div>
      )}
    </section>
  )
}

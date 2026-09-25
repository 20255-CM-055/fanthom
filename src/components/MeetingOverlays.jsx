import { useEffect, useState } from 'react'
import { Check, Clipboard, Link2, X } from 'lucide-react'
import { formatClock } from '../utils/meetingState'

const highlightTypes = ['Key Moment', 'Decision', 'Customer Feedback', 'Action Item']

function ModalFrame({ title, onClose, children, className = '' }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className={`dialog-card ${className}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header className="dialog-header">
          <h2 id="dialog-title">{title}</h2>
          <button className="dialog-close" type="button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
        </header>
        {children}
      </section>
    </div>
  )
}

export function AddHighlightModal({ meeting, segment, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Key Moment')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    const endTimestamp = Math.min(segment.timestamp + 30, meeting.durationSeconds || meeting.durationMinutes * 60)
    onSave({
      id: `highlight-${Date.now()}`,
      timestamp: segment.timestamp,
      endTimestamp,
      time: segment.time,
      title: trimmedTitle,
      type,
      text: segment.text,
      excerpt: `“${segment.text}”`,
    })
  }

  return (
    <ModalFrame title="Add highlight" onClose={onClose} className="highlight-dialog">
      <form className="dialog-form" onSubmit={handleSubmit}>
        <p className="dialog-description">Save a key moment from the conversation so your team can find it later.</p>
        <label className="dialog-field">
          <span>Highlight title</span>
          <input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give this moment a name" required maxLength={90} />
        </label>
        <div className="dialog-field-row">
          <label className="dialog-field">
            <span>Type</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              {highlightTypes.map((highlightType) => <option key={highlightType}>{highlightType}</option>)}
            </select>
          </label>
          <div className="dialog-field">
            <span>Clip range · 30 sec</span>
            <div className="dialog-readonly-field">{formatClock(segment.timestamp)} <span className="dialog-range-separator">—</span> {formatClock(Math.min(segment.timestamp + 30, meeting.durationSeconds || meeting.durationMinutes * 60))}</div>
          </div>
        </div>
        <div className="dialog-quote"><strong>{segment.speaker}</strong><span>“{segment.text}”</span></div>
        <footer className="dialog-actions">
          <button className="dialog-secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="dialog-primary-button" type="submit">Save highlight</button>
        </footer>
      </form>
    </ModalFrame>
  )
}

export function ShareHighlightModal({ meeting, highlight, onClose }) {
  const safeSlug = (value) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const shareUrl = `https://app.fathom.example/share/${safeSlug(meeting.id)}/${safeSlug(highlight.id)}`
  const [copyState, setCopyState] = useState('idle')

  async function copyLink() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(shareUrl)
      setCopyState('copied')
    } catch {
      setCopyState('fallback')
    }
  }

  const duration = Math.max(0, (highlight.endTimestamp || highlight.timestamp + 30) - highlight.timestamp)

  return (
    <ModalFrame title="Share highlight" onClose={onClose} className="share-dialog">
      <div className="share-dialog-body">
        <div className="share-preview">
          <div className="share-preview-top"><span className="share-preview-mark"><Link2 size={15} /></span><span>FATHOM CLIP</span></div>
          <strong>{highlight.title}</strong>
          <span>{meeting.title}</span>
          <div className="share-preview-time"><span>{formatClock(highlight.timestamp)}</span><i /><span>{formatClock(highlight.timestamp + duration)}</span></div>
        </div>
        <p className="dialog-description">Anyone with this link can view this meeting clip.</p>
        <label className="dialog-field share-link-field">
          <span>Share link</span>
          <input readOnly value={shareUrl} onFocus={(event) => event.target.select()} aria-label="Generated share URL" />
        </label>
        {copyState === 'copied' && <p className="copy-confirmation"><Check size={14} />Link copied</p>}
        {copyState === 'fallback' && <p className="copy-fallback">Clipboard access is unavailable. Select the link above to copy it.</p>}
        <footer className="dialog-actions">
          <button className="dialog-secondary-button" type="button" onClick={onClose}>Close</button>
          <button className="dialog-primary-button" type="button" onClick={copyLink}>
            {copyState === 'copied' ? <Check size={15} /> : <Clipboard size={15} />}
            {copyState === 'copied' ? 'Link copied' : 'Copy link'}
          </button>
        </footer>
      </div>
    </ModalFrame>
  )
}

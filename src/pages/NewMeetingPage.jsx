import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Check,
  CircleStop,
  Clock3,
  Headphones,
  LoaderCircle,
  Mic2,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { saveSimulatedMeeting } from '../data/meetings'
import { formatClock } from '../utils/meetingState'
import '../styles/capture-flow.css'

const platforms = [
  { id: 'Zoom', mark: 'Z', className: 'zoom' },
  { id: 'Google Meet', mark: 'G', className: 'google' },
  { id: 'Microsoft Teams', mark: 'T', className: 'teams' },
]

const processingSteps = ['Recording complete', 'Generating transcript', 'Generating summary']

export function NewMeetingPage() {
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('Zoom')
  const [phase, setPhase] = useState('setup')
  const [elapsed, setElapsed] = useState(0)
  const [processingStep, setProcessingStep] = useState(-1)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (phase !== 'recording') return undefined
    const timer = window.setInterval(() => setElapsed((seconds) => seconds + 1), 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  function startMeeting(event) {
    event.preventDefault()
    setElapsed(0)
    setError('')
    setPhase('recording')
  }

  async function endMeeting() {
    setPhase('processing')
    setProcessingStep(0)
    for (let step = 1; step < processingSteps.length; step += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 750))
      setProcessingStep(step)
    }
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    const meeting = saveSimulatedMeeting({ title, platform, durationSeconds: elapsed })
    if (!meeting) {
      setError('This browser could not save the simulated meeting. Check local storage access and try again.')
      return
    }
    navigate(`/calls/${meeting.id}`)
  }

  if (phase === 'processing') {
    return (
      <div className="page capture-page capture-processing-page">
        <div className="capture-processing-card">
          <span className="capture-brand-mark"><LoaderCircle size={21} /></span>
          <div className="eyebrow"><span className="eyebrow-dot" />MEETING WRAP-UP</div>
          <h1>Getting your meeting ready</h1>
          <p className="capture-lede">Preparing the demo meeting workspace for <strong>{title.trim() || 'New Meeting'}</strong>.</p>
          <ol className="processing-steps">
            {processingSteps.map((step, index) => (
              <li className={index < processingStep ? 'is-complete' : index === processingStep ? 'is-active' : ''} key={step}>
                <span>{index < processingStep ? <Check size={14} /> : index === processingStep ? <LoaderCircle size={14} /> : <i />}</span>
                <strong>{step}</strong>
                {index < processingStep && <small>Complete</small>}
              </li>
            ))}
          </ol>
          <div className="capture-honesty-note"><ShieldCheck size={15} />Demo only — no audio was recorded or transcribed.</div>
          {error && <p className="capture-error" role="alert">{error}</p>}
          {error && <Link className="capture-back-link" to="/calls"><ArrowLeft size={14} />Return to My Calls</Link>}
        </div>
      </div>
    )
  }

  if (phase === 'recording') {
    return (
      <div className="page capture-page capture-live-page">
        <Link className="capture-back-link" to="/calls"><ArrowLeft size={14} />My Calls</Link>
        <div className="capture-live-card">
          <div className="capture-live-topline"><span className="capture-recording-badge"><i />SIMULATED RECORDING</span><span className="capture-demo-label">Demo mode</span></div>
          <div className="capture-live-content">
            <div className="capture-live-icon"><Headphones size={28} /></div>
            <h1>{title.trim() || 'New Meeting'}</h1>
            <div className="capture-live-meta">
              <span className={`capture-platform-mark ${platforms.find((item) => item.id === platform)?.className}`}>{platforms.find((item) => item.id === platform)?.mark}</span>
              <span>{platform}</span><i /><span>Jordan Davis</span>
            </div>
            <div className="capture-live-clock" aria-live="polite"><span />{formatClock(elapsed)}</div>
            <p className="capture-live-explainer">Fathom is simulating a notetaker session. No audio or video is being captured.</p>
            <button className="capture-end-button" type="button" onClick={endMeeting}><CircleStop size={17} />End Meeting</button>
          </div>
          <div className="capture-live-footer"><ShieldCheck size={14} />Your demo session stays in this browser.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page capture-page capture-setup-page">
      <Link className="capture-back-link" to="/calls"><ArrowLeft size={14} />Back to My Calls</Link>
      <div className="eyebrow"><span className="eyebrow-dot" />START A CONVERSATION</div>
      <div className="capture-setup-heading">
        <h1>New Meeting</h1>
        <p>Set up a simulated Fathom notetaker session.</p>
      </div>
      <div className="capture-setup-layout">
        <form className="capture-setup-card" onSubmit={startMeeting}>
          <label className="capture-field">
            <span>Meeting title</span>
            <input
              autoFocus
              maxLength={100}
              placeholder="e.g. Product planning"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <fieldset className="capture-platform-field">
            <legend>Meeting platform</legend>
            <p>Select where your simulated meeting is taking place.</p>
            <div className="capture-platform-options">
              {platforms.map((item) => (
                <label className={`capture-platform-option${platform === item.id ? ' is-selected' : ''}`} key={item.id}>
                  <input
                    type="radio"
                    name="meeting-platform"
                    value={item.id}
                    checked={platform === item.id}
                    onChange={() => setPlatform(item.id)}
                  />
                  <span className={`capture-platform-mark ${item.className}`}>{item.mark}</span>
                  <span>{item.id}</span>
                  {platform === item.id && <Check size={15} />}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="capture-ready-state"><span><Mic2 size={16} /></span><div><strong>Simulated notetaker ready</strong><p>No meeting account or audio access is used.</p></div><span className="capture-ready-check"><Check size={13} /></span></div>
          <button className="capture-start-button" type="submit"><Video size={16} />Start Meeting</button>
          <div className="capture-consent"><ShieldCheck size={14} />Demo mode — no real recording or transcription.</div>
        </form>
        <aside className="capture-preview-card">
          <div className="capture-preview-icon"><Clock3 size={17} /></div>
          <strong>Your meeting, organized</strong>
          <p>End the session whenever you’re ready. Fathom will prepare a demo transcript and summary in the familiar meeting workspace.</p>
          <div className="capture-preview-step"><span>1</span>Start a simulated session</div>
          <div className="capture-preview-step"><span>2</span>End and process the meeting</div>
          <div className="capture-preview-step"><span>3</span>Open meeting intelligence</div>
        </aside>
      </div>
    </div>
  )
}

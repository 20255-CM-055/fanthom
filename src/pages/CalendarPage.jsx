import { useState } from 'react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Unplug,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DEFAULT_CALENDAR_CONNECTIONS,
  getCalendarConnections,
  saveCalendarConnections,
} from '../utils/appPreferences'
import '../styles/preferences.css'

const providers = [
  {
    id: 'google',
    name: 'Google Calendar',
    description: 'Sync your events and automatically find calls to record.',
    logo: 'G',
    className: 'google',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Calendar',
    description: 'Connect your Outlook calendar to keep meetings in sync.',
    logo: 'M',
    className: 'microsoft',
  },
]

function formatLastSync(value) {
  if (!value) return 'Not synced yet'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Not synced yet'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function CalendarPage() {
  const [connections, setConnections] = useState(getCalendarConnections)
  const [message, setMessage] = useState('')
  const [saveError, setSaveError] = useState(false)

  function persist(next, feedback) {
    if (!saveCalendarConnections(next)) {
      setSaveError(true)
      setMessage('Calendar preferences could not be saved in this browser.')
      return
    }
    setConnections(next)
    setSaveError(false)
    setMessage(feedback)
  }

  function toggleConnection(provider) {
    const connected = !connections[provider].connected
    const next = {
      ...connections,
      [provider]: {
        ...connections[provider],
        connected,
        lastSyncedAt: connected ? new Date().toISOString() : connections[provider].lastSyncedAt,
      },
    }
    persist(next, connected
      ? `${providers.find((item) => item.id === provider)?.name} connected in demo mode.`
      : `${providers.find((item) => item.id === provider)?.name} disconnected.`)
  }

  function syncCalendar(provider) {
    const next = {
      ...connections,
      [provider]: { ...connections[provider], lastSyncedAt: new Date().toISOString() },
    }
    persist(next, 'Calendar synced just now.')
  }

  const connectedCount = Object.values(connections).filter((connection) => connection.connected).length

  return (
    <div className="page preferences-page calendar-page">
      <div className="eyebrow"><span className="eyebrow-dot" />WORKSPACE CONNECTIONS</div>
      <div className="preferences-heading calendar-heading">
        <div>
          <h1>Calendar &amp; integrations</h1>
          <p>Connect a calendar to keep your meeting library in sync.</p>
        </div>
        <span className="integration-count"><CalendarDays size={15} />{connectedCount} connected</span>
      </div>

      <div className="calendar-demo-banner">
        <span><ShieldCheck size={17} /></span>
        <div><strong>Connections are simulated</strong><p>This demo saves connection preferences in your browser. No account access or OAuth is used.</p></div>
        <Link to="/settings"><Settings2 size={15} />Settings</Link>
      </div>

      <section className="integration-section" aria-labelledby="calendar-connections-title">
        <div className="integration-section-heading">
          <div><h2 id="calendar-connections-title">Calendar connections</h2><p>Manage which calendars Fathom checks for meetings.</p></div>
          <span>{connectedCount} of {providers.length} connected</span>
        </div>

        <div className="integration-list">
          {providers.map((provider) => {
            const connection = connections[provider.id] || DEFAULT_CALENDAR_CONNECTIONS[provider.id]
            return (
              <article className={`integration-card${connection.connected ? ' is-connected' : ''}`} key={provider.id}>
                <span className={`integration-logo ${provider.className}`}>{provider.logo}</span>
                <div className="integration-copy">
                  <div className="integration-name-line"><h3>{provider.name}</h3>
                    <span className={`connection-status${connection.connected ? ' status-connected' : ' status-disconnected'}`}>
                      <i />{connection.connected ? 'Connected' : 'Not connected'}
                    </span>
                  </div>
                  <p>{provider.description}</p>
                  {connection.connected && (
                    <div className="integration-sync-meta">
                      <span><RefreshCw size={12} />Calendar sync on</span>
                      <span><Clock3 size={12} />Last synced {formatLastSync(connection.lastSyncedAt)}</span>
                    </div>
                  )}
                </div>
                <div className="integration-actions">
                  {connection.connected && (
                    <button className="subtle-button sync-button" type="button" onClick={() => syncCalendar(provider.id)}>
                      <RefreshCw size={14} />Sync now
                    </button>
                  )}
                  <button
                    className={connection.connected ? 'subtle-button disconnect-button' : 'primary-button connect-button'}
                    type="button"
                    onClick={() => toggleConnection(provider.id)}
                  >
                    {connection.connected ? <><Unplug size={14} />Disconnect</> : <><CheckCircle2 size={15} />Connect</>}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
        <p className={`calendar-feedback${saveError ? ' is-error' : ''}`} role="status">
          {message ? <>{!saveError && <Check size={14} />}{message}</> : <><ExternalLink size={13} />Your calendar details stay on this device in this demo.</>}
        </p>
      </section>

      <section className="calendar-how-it-works">
        <span><CalendarDays size={18} /></span>
        <div><strong>What happens when you connect?</strong><p>Fathom can match scheduled events with your calls, prepare your meeting workspace, and keep your calendar sync status up to date.</p></div>
      </section>
    </div>
  )
}

import { useState } from 'react'
import {
  BellRing,
  Check,
  ChevronDown,
  ClipboardCheck,
  LockKeyhole,
  Settings2,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPreferences, savePreferences } from '../utils/appPreferences'
import '../styles/preferences.css'

const templateOptions = [
  { id: 'general', label: 'General' },
  { id: 'projectUpdate', label: 'Project Update' },
  { id: 'sales', label: 'Sales' },
  { id: 'oneOnOne', label: '1:1' },
]

const platformOptions = [
  { id: 'zoom', label: 'Zoom', initials: 'Z', className: 'zoom' },
  { id: 'googleMeet', label: 'Google Meet', initials: 'G', className: 'google' },
  { id: 'teams', label: 'Microsoft Teams', initials: 'T', className: 'teams' },
]

function PreferenceToggle({ checked, onChange, label, description }) {
  return (
    <div className="preference-row">
      <div className="preference-row-copy"><strong>{label}</strong><p>{description}</p></div>
      <button
        className={`preference-switch${checked ? ' is-on' : ''}`}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  )
}

function PreferenceSelect({ label, description, value, options, onChange }) {
  return (
    <div className="preference-row preference-select-row">
      <div className="preference-row-copy"><strong>{label}</strong><p>{description}</p></div>
      <label className="preference-select">
        <span className="visually-hidden">{label}</span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown size={14} aria-hidden="true" />
      </label>
    </div>
  )
}

export function SettingsPage() {
  const [preferences, setPreferences] = useState(getPreferences)
  const [saveState, setSaveState] = useState('saved')

  function updatePreferences(changes) {
    const next = { ...preferences, ...changes }
    if (!savePreferences(next)) {
      setSaveState('error')
      return
    }
    setPreferences(next)
    setSaveState('saved')
  }

  function updatePlatform(platform, enabled) {
    updatePreferences({ platforms: { ...preferences.platforms, [platform]: enabled } })
  }

  return (
    <div className="page preferences-page">
      <div className="eyebrow"><span className="eyebrow-dot" />WORKSPACE PREFERENCES</div>
      <div className="preferences-heading">
        <div>
          <h1>Settings</h1>
          <p>Make Fathom work the way your team does.</p>
        </div>
        <span className={`preferences-save-state${saveState === 'error' ? ' is-error' : ''}`} role="status">
          {saveState === 'saved' ? <><Check size={14} /> All changes saved</> : 'Could not save changes in this browser'}
        </span>
      </div>

      <div className="preferences-layout">
        <nav className="preferences-nav" aria-label="Settings sections">
          <a href="#recording"><Video size={16} />Recording</a>
          <a href="#ai"><Settings2 size={16} />AI &amp; summaries</a>
          <a href="#privacy"><ShieldCheck size={16} />Sharing &amp; privacy</a>
          <Link to="/calendar"><BellRing size={16} />Calendar connections</Link>
        </nav>

        <div className="preferences-sections">
          <section className="preference-card" id="recording">
            <header className="preference-card-header">
              <span className="preference-card-icon recording-icon"><Video size={17} /></span>
              <div><h2>Recording</h2><p>Choose when Fathom joins your meetings.</p></div>
            </header>
            <PreferenceToggle
              label="Auto-record meetings"
              description="Automatically join and record eligible meetings on your connected calendar."
              checked={preferences.autoRecord}
              onChange={(autoRecord) => updatePreferences({ autoRecord })}
            />
            <div className="preference-row platform-preference-row">
              <div className="preference-row-copy"><strong>Meeting platforms</strong><p>Choose which meeting providers Fathom can join.</p></div>
              <div className="platform-options">
                {platformOptions.map((platform) => (
                  <label className="platform-option" key={platform.id}>
                    <input
                      type="checkbox"
                      checked={Boolean(preferences.platforms[platform.id])}
                      onChange={(event) => updatePlatform(platform.id, event.target.checked)}
                    />
                    <span className={`platform-logo ${platform.className}`}>{platform.initials}</span>
                    <span>{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <PreferenceSelect
              label="Meeting consent"
              description="How participants are informed when Fathom joins."
              value={preferences.consentMode}
              options={[
                { value: 'announce', label: 'Announce Fathom in the meeting' },
                { value: 'notification', label: 'Show a participant notification' },
                { value: 'manual', label: 'I’ll notify participants myself' },
              ]}
              onChange={(consentMode) => updatePreferences({ consentMode })}
            />
          </section>

          <section className="preference-card" id="ai">
            <header className="preference-card-header">
              <span className="preference-card-icon ai-icon"><Settings2 size={17} /></span>
              <div><h2>AI &amp; summaries</h2><p>Set the defaults for meeting notes and follow-ups.</p></div>
            </header>
            <PreferenceSelect
              label="Default summary template"
              description="New meeting summaries open with this structure. You can still change the template on any meeting."
              value={preferences.defaultSummaryTemplate}
              options={templateOptions.map(({ id, label }) => ({ value: id, label }))}
              onChange={(defaultSummaryTemplate) => updatePreferences({ defaultSummaryTemplate })}
            />
            <PreferenceToggle
              label="Create action items automatically"
              description="Identify follow-ups and suggest an owner from the conversation."
              checked={preferences.automaticActionItems}
              onChange={(automaticActionItems) => updatePreferences({ automaticActionItems })}
            />
            <PreferenceSelect
              label="Summary detail"
              description="Choose how much context to include in generated notes."
              value={preferences.summaryStyle}
              options={[
                { value: 'concise', label: 'Concise' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'detailed', label: 'Detailed' },
              ]}
              onChange={(summaryStyle) => updatePreferences({ summaryStyle })}
            />
            <div className="preference-inline-note"><ClipboardCheck size={15} /><span>Your chosen template is used as the starting view on meeting summaries.</span></div>
          </section>

          <section className="preference-card" id="privacy">
            <header className="preference-card-header">
              <span className="preference-card-icon privacy-icon"><LockKeyhole size={17} /></span>
              <div><h2>Sharing &amp; privacy</h2><p>Control who can access meeting content by default.</p></div>
            </header>
            <PreferenceSelect
              label="Default meeting visibility"
              description="New meetings start with this access level."
              value={preferences.defaultVisibility}
              options={[
                { value: 'private', label: 'Only me' },
                { value: 'team', label: 'My workspace' },
                { value: 'link', label: 'Anyone with a link' },
              ]}
              onChange={(defaultVisibility) => updatePreferences({ defaultVisibility })}
            />
            <PreferenceToggle
              label="Share summaries and recordings"
              description="Include the summary and recording when sharing a meeting."
              checked={preferences.shareSummaryAndRecording}
              onChange={(shareSummaryAndRecording) => updatePreferences({ shareSummaryAndRecording })}
            />
            <PreferenceToggle
              label="Allow highlight sharing"
              description="Let people with meeting access share individual highlight clips."
              checked={preferences.shareHighlights}
              onChange={(shareHighlights) => updatePreferences({ shareHighlights })}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  CalendarDays,
  CheckSquare,
  ChevronRight,
  ChevronDown,
  CircleHelp,
  FileText,
  Home,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react'

const navigation = [
  { label: 'My Calls', to: '/calls', icon: Home, end: true },
  { label: 'Search', to: '/search', icon: Search },
  { label: 'Ask Fathom', to: '/ask', icon: Sparkles },
  { label: 'Highlights', to: '/highlights', icon: FileText },
  { label: 'Action Items', to: '/action-items', icon: CheckSquare },
  { label: 'Calendar', to: '/calendar', icon: CalendarDays },
]

export function Sidebar({ onNavigate }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false)

  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/calls" onClick={onNavigate} aria-label="Fathom home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span>fathom</span>
      </NavLink>

      <button
        className={`workspace-switcher${workspaceOpen ? ' is-open' : ''}`}
        type="button"
        onClick={() => setWorkspaceOpen((open) => !open)}
        aria-expanded={workspaceOpen}
      >
        <span className="workspace-avatar">A</span>
        <span className="workspace-copy">
          <strong>Acme Studio</strong>
          <small>Workspace</small>
        </span>
        <ChevronDown size={15} className="workspace-chevron" />
      </button>
      {workspaceOpen && (
        <div className="workspace-menu">
          <strong>Acme Studio</strong>
          <span>Personal workspace</span>
          <button type="button" onClick={() => setWorkspaceOpen(false)}>Close workspace menu</button>
        </div>
      )}

      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="primary-nav" aria-label="Main navigation">
        {navigation.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {label === 'Action Items' && <span className="nav-count">3</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-divider" />
        <NavLink
          to="/settings"
          onClick={onNavigate}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
        <button className="nav-link sidebar-help" type="button" onClick={() => window.open('mailto:support@fathom.video')}>
          <CircleHelp size={18} strokeWidth={1.8} />
          <span>Help &amp; support</span>
        </button>
        <div className="profile-card">
          <span className="profile-avatar">JD</span>
          <span className="profile-copy">
            <strong>Jordan Davis</strong>
            <small>jordan@acmestudio.com</small>
          </span>
          <Link className="profile-menu-button" to="/settings" aria-label="Account settings">
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </aside>
  )
}

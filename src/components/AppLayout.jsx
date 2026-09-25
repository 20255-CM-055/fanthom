import { useEffect, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sidebar } from './Sidebar'

function getPageLabel(pathname) {
  if (pathname.startsWith('/calls/')) return 'Meeting details'
  if (pathname === '/new-meeting') return 'New Meeting'
  const labels = {
    '/calls': 'My Calls',
    '/search': 'Search',
    '/ask': 'Ask Fathom',
    '/highlights': 'Highlights',
    '/action-items': 'Action Items',
    '/calendar': 'Calendar',
    '/settings': 'Settings',
  }
  return labels[pathname] || 'My Calls'
}

export function AppLayout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  function submitSearch(event) {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
  }

  return (
    <div className="app-shell">
      {mobileNavOpen && (
        <button
          className="mobile-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <div className={`sidebar-wrap${mobileNavOpen ? ' mobile-open' : ''}`}>
        <Sidebar onNavigate={() => setMobileNavOpen(false)} />
      </div>
      <div className="main-column">
        <header className="topbar">
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="breadcrumb">
            <span>Acme Studio</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{getPageLabel(location.pathname)}</strong>
          </div>
          <form className="global-search" onSubmit={submitSearch} role="search">
            <Search size={16} aria-hidden="true" />
            <input
              aria-label="Search calls"
              placeholder="Search your calls..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd>↵</kbd>
          </form>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}

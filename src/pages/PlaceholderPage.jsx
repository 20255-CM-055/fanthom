import { ArrowRight, CalendarDays, CheckSquare, FileText, Search, Settings, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const pageContent = {
  '/search': { title: 'Search', description: 'Find the details, decisions, and moments you remember from any conversation.', icon: Search },
  '/ask': { title: 'Ask Fathom', description: 'Get answers grounded in your meeting notes and conversations.', icon: Sparkles },
  '/highlights': { title: 'Highlights', description: 'The moments worth coming back to, gathered from your calls.', icon: FileText },
  '/action-items': { title: 'Action Items', description: 'A clear view of what was promised and who owns the next step.', icon: CheckSquare },
  '/calendar': { title: 'Calendar', description: 'See the conversations around your schedule in one place.', icon: CalendarDays },
  '/settings': { title: 'Settings', description: 'Manage your workspace and Fathom preferences.', icon: Settings },
}

export function PlaceholderPage() {
  const { pathname } = useLocation()
  const page = pageContent[pathname] || pageContent['/search']
  const Icon = page.icon

  return (
    <div className="page placeholder-page">
      <div className="eyebrow"><span className="eyebrow-dot" />YOUR WORKSPACE</div>
      <div className="placeholder-icon"><Icon size={21} /></div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      <div className="placeholder-note">
        <span className="placeholder-note-mark"><Icon size={17} /></span>
        <span><strong>Your meeting library is ready.</strong><small>Explore your latest calls while we bring this workspace view together.</small></span>
        <Link to="/calls" aria-label="Browse My Calls"><ArrowRight size={17} /></Link>
      </div>
      <Link className="text-button placeholder-link" to="/calls">Browse My Calls <ArrowRight size={14} /></Link>
    </div>
  )
}

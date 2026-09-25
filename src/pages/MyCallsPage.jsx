import { useMemo, useState } from 'react'
import { CalendarDays, ChevronDown, ListFilter, Plus, SearchX, Sparkles } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { MeetingCard } from '../components/MeetingCard'
import { getMeetings } from '../data/meetings'

const dateRanges = [
  { value: '30', label: 'Last 30 days' },
  { value: '7', label: 'Last 7 days' },
  { value: 'today', label: 'Today' },
  { value: 'all', label: 'All time' },
]

const meetingTypes = ['All types', 'Team Meeting', 'Customer Call', '1:1']

export function MyCallsPage() {
  const [searchParams] = useSearchParams()
  const [dateRange, setDateRange] = useState('30')
  const [meetingType, setMeetingType] = useState('All types')
  const [meetings] = useState(getMeetings)
  const query = (searchParams.get('q') || '').trim().toLowerCase()

  const visibleMeetings = useMemo(() => {
    const now = new Date()
    return [...meetings]
      .filter((meeting) => {
        if (meetingType !== 'All types' && meeting.type !== meetingType) return false
        if (dateRange !== 'all') {
          const meetingDate = new Date(meeting.date)
          if (dateRange === 'today' && meetingDate.toDateString() !== now.toDateString()) return false
          if (dateRange !== 'today') {
            const ageInDays = (now.getTime() - meetingDate.getTime()) / 86_400_000
            if (ageInDays < 0 || ageInDays > Number(dateRange)) return false
          }
        }
        if (!query) return true
        const searchableText = [
          meeting.title,
          meeting.type,
          meeting.summary,
          ...meeting.participants.map(({ name, role }) => `${name} ${role}`),
        ].join(' ').toLowerCase()
        return searchableText.includes(query)
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [dateRange, meetingType, query, meetings])

  return (
    <div className="page dashboard-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" />YOUR MEETING LIBRARY</div>
          <h1>My Calls</h1>
          <p className="page-description">All your conversations, organized and ready when you need them.</p>
        </div>
        <div className="dashboard-heading-actions">
          <Link className="new-meeting-button" to="/new-meeting"><Plus size={15} />New Meeting</Link>
          <Link className="dashboard-ask-button" to="/ask"><Sparkles size={14} />Ask Fathom</Link>
        </div>
      </div>

      <section className="library-toolbar" aria-label="Filter meetings">
        <div className="library-count">
          <strong>{visibleMeetings.length}</strong>
          <span>{visibleMeetings.length === 1 ? 'conversation' : 'conversations'}</span>
          {query && <span className="search-context">matching “{searchParams.get('q')}”</span>}
        </div>
        <div className="filter-controls">
          <label className="select-control">
            <CalendarDays size={15} aria-hidden="true" />
            <span className="visually-hidden">Filter by date</span>
            <select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
              {dateRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
          <label className="select-control type-filter">
            <ListFilter size={15} aria-hidden="true" />
            <span className="visually-hidden">Filter by meeting type</span>
            <select value={meetingType} onChange={(event) => setMeetingType(event.target.value)}>
              {meetingTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
        </div>
      </section>

      {visibleMeetings.length > 0 ? (
        <section className="meeting-list" aria-label="Meetings">
          {visibleMeetings.map((meeting, index) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              featured={!query && index === 0 && meeting.id === 'engineering-leadership-sync'}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <span className="empty-state-icon"><SearchX size={23} /></span>
          <h2>No calls found</h2>
          <p>{query ? 'Try a different search or adjust your filters.' : 'There are no calls in this date range.'}</p>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setDateRange('all')
              setMeetingType('All types')
            }}
          >
            Clear filters
          </button>
        </section>
      )}
    </div>
  )
}

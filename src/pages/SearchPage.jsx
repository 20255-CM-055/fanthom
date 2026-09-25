import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, Clock3, Search, SearchX, Sparkles } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchMeetingTranscripts } from '../data/meetingSearch'
import { meetingTimestampUrl } from '../utils/meetingLinks'
import '../styles/search-ask.css'

const suggestedSearches = ['SSO', 'launch', 'API', 'customer', 'onboarding']

function SearchSnippet({ text, query }) {
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return text
  const expression = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig')
  return text.split(expression).map((part, index) => (
    terms.some((term) => term.toLowerCase() === part.toLowerCase())
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : part
  ))
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const [query, setQuery] = useState(queryParam)

  useEffect(() => setQuery(queryParam), [queryParam])

  const results = useMemo(() => searchMeetingTranscripts(queryParam), [queryParam])

  function submitSearch(event) {
    event.preventDefault()
    const trimmed = query.trim()
    setSearchParams(trimmed ? { q: trimmed } : {})
  }

  function chooseSuggestion(value) {
    setQuery(value)
    setSearchParams({ q: value })
  }

  return (
    <div className="page cross-search-page">
      <div className="eyebrow"><span className="eyebrow-dot" />YOUR MEETING LIBRARY</div>
      <div className="cross-page-title-row">
        <div><h1>Search your calls</h1><p>Find the moment, decision, or detail you remember.</p></div>
        <Link className="ask-link-button" to="/ask"><Sparkles size={15} />Ask Fathom</Link>
      </div>

      <form className="cross-search-form" role="search" onSubmit={submitSearch}>
        <Search size={19} />
        <input
          autoFocus
          aria-label="Search meetings and transcripts"
          placeholder="Search meetings, transcripts, speakers..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && <button type="button" className="search-clear-button" onClick={() => { setQuery(''); setSearchParams({}) }}>Clear</button>}
        <button className="cross-search-submit" type="submit">Search</button>
      </form>

      {!queryParam && (
        <section className="suggested-search-section">
          <span>Try a search</span>
          <div>{suggestedSearches.map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => chooseSuggestion(suggestion)}>{suggestion}</button>
          ))}</div>
        </section>
      )}

      {queryParam && (
        <section className="cross-results-section">
          <div className="cross-results-heading">
            <div><strong>{results.length}</strong> {results.length === 1 ? 'moment' : 'moments'} for <span>“{queryParam}”</span></div>
            <span>Across your transcripts</span>
          </div>
          {results.length ? (
            <div className="cross-result-list">
              {results.map((result) => (
                <Link className="cross-result-card" key={`${result.meetingId}-${result.segmentId}`} to={meetingTimestampUrl(result)}>
                  <span className="cross-result-time"><Clock3 size={13} />{result.time}</span>
                  <span className="cross-result-content">
                    <span className="cross-result-title-row"><strong>{result.meetingTitle}</strong><ArrowUpRight size={14} /></span>
                    <span className="cross-result-meta"><span>{result.speaker}</span><i /><span><CalendarDays size={12} />{formatDate(result.date)}</span></span>
                    <span className="cross-result-snippet"><SearchSnippet text={result.snippet} query={queryParam} /></span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="cross-search-empty">
              <span><SearchX size={19} /></span>
              <strong>No transcript matches yet</strong>
              <p>Try a different topic or search for a speaker’s name.</p>
              <div>{suggestedSearches.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => chooseSuggestion(suggestion)}>{suggestion}</button>
              ))}</div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

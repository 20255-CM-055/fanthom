import { useState } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, CheckSquare, Clock3, CornerDownLeft, MessageCircle, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { answerMeetingQuestion } from '../data/meetingSearch'
import { meetingTimestampUrl } from '../utils/meetingLinks'
import '../styles/search-ask.css'

const demoQuestions = [
  { question: 'Which meetings discussed SSO?', icon: MessageCircle },
  { question: 'What are the open action items?', icon: CheckSquare },
  { question: 'Which customers mentioned onboarding issues?', icon: Users },
]

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date))
}

export function AskFathomPage() {
  const [question, setQuestion] = useState('')
  const [submittedQuestion, setSubmittedQuestion] = useState('')
  const [response, setResponse] = useState(null)

  function ask(value = question) {
    const trimmed = value.trim()
    if (!trimmed) return
    setQuestion(trimmed)
    setSubmittedQuestion(trimmed)
    setResponse(answerMeetingQuestion(trimmed))
  }

  return (
    <div className="page ask-page">
      <div className="ask-page-content">
        <div className="ask-page-eyebrow"><span className="ask-brand-mark"><Sparkles size={14} /></span>MEETING INTELLIGENCE</div>
        <h1>Ask Fathom</h1>
        <p className="ask-page-description">Get answers from your conversations, with the moments to back them up.</p>

        <form className="ask-question-form" onSubmit={(event) => { event.preventDefault(); ask() }}>
          <span className="ask-input-icon"><Sparkles size={17} /></span>
          <label className="visually-hidden" htmlFor="ask-fathom-question">Ask a question about your meetings</label>
          <textarea
            id="ask-fathom-question"
            rows="2"
            placeholder="Ask a question about your meetings..."
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                ask()
              }
            }}
          />
          <button className="ask-submit-button" type="submit" aria-label="Ask Fathom"><ArrowRight size={17} /></button>
          <span className="ask-enter-hint"><CornerDownLeft size={11} />Enter to ask</span>
        </form>

        {!submittedQuestion && (
          <section className="ask-suggestions">
            <div className="ask-suggestions-title"><span>GET STARTED</span><span>Try asking</span></div>
            {demoQuestions.map(({ question: suggestion, icon: Icon }) => (
              <button className="ask-suggestion" type="button" key={suggestion} onClick={() => ask(suggestion)}>
                <span className="ask-suggestion-icon"><Icon size={15} /></span>
                <span>{suggestion}</span>
                <ArrowUpRight size={14} />
              </button>
            ))}
          </section>
        )}

        {submittedQuestion && response && (
          <section className="ask-response" aria-live="polite">
            <div className="ask-question-echo"><span><Sparkles size={13} /></span><strong>{submittedQuestion}</strong></div>
            <div className="answer-card">
              <div className="answer-card-top"><span className="answer-ai-icon"><Sparkles size={15} /></span><span>FATHOM ANSWER</span><span className="answer-reference-count">{response.references.length} {response.references.length === 1 ? 'reference' : 'references'}</span></div>
              <p className="answer-summary">{response.answer}</p>
              <div className="answer-references">
                {response.references.map((reference, index) => (
                  <Link className="answer-reference" key={`${reference.meetingId}-${reference.segmentId}-${index}`} to={meetingTimestampUrl(reference)}>
                    <span className="answer-reference-icon">{response.intent === 'open-actions' ? <CheckSquare size={15} /> : response.intent === 'customer-onboarding' ? <Users size={15} /> : <MessageCircle size={15} />}</span>
                    <span className="answer-reference-content">
                      <span className="answer-reference-heading"><strong>{reference.meetingTitle}</strong><ArrowUpRight size={13} /></span>
                      <span className="answer-reference-meta">{reference.speaker}<i />{formatDate(reference.date)}<i /><Clock3 size={11} />{reference.time}</span>
                      <span className="answer-reference-snippet">{reference.snippet}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="answer-source-note"><Sparkles size={12} />Grounded in your meeting transcripts and action items</div>
            </div>
          </section>
        )}

        {submittedQuestion && !response && (
          <section className="ask-unsupported" aria-live="polite">
            <span className="ask-unsupported-icon"><MessageCircle size={18} /></span>
            <strong>No meeting answer found</strong>
            <p>I couldn’t find a clear answer in your calls. Try one of these questions to explore your meeting notes.</p>
            <div>{demoQuestions.map(({ question: suggestion }) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>
          </section>
        )}
      </div>
    </div>
  )
}

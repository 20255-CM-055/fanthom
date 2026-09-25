import { useMemo } from 'react'
import { Check, Circle, ListChecks } from 'lucide-react'

export function ActionItemsPanel({ items, completed, onToggle, compact = false }) {
  const completedCount = useMemo(
    () => items.filter((item) => completed[item.id]).length,
    [completed, items],
  )

  return (
    <section className={`action-items-panel${compact ? ' action-items-compact' : ''}`}>
      <div className="panel-section-heading">
        <div className="panel-heading-title">
          <span className="panel-icon action-panel-icon"><ListChecks size={16} /></span>
          <h2>Action items</h2>
        </div>
        <span className="action-count">{completedCount} of {items.length} done</span>
      </div>
      <div className="action-progress-track" aria-label={`${completedCount} of ${items.length} action items completed`}>
        <span style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }} />
      </div>
      <ul className="detail-action-list">
        {items.map((item) => {
          const isComplete = Boolean(completed[item.id])
          return (
            <li className={isComplete ? 'action-complete' : ''} key={item.id}>
              <button
                className="action-toggle"
                type="button"
                onClick={() => onToggle(item.id)}
                aria-label={`${isComplete ? 'Mark incomplete' : 'Complete'}: ${item.text}`}
                aria-pressed={isComplete}
              >
                {isComplete ? <Check size={13} /> : <Circle size={16} />}
              </button>
              <span className="detail-action-copy">
                <span className="detail-action-task">{item.text}</span>
                <span className="detail-action-meta">{item.owner} <span>·</span> Due {item.due}</span>
              </span>
              {!compact && <span className={`due-pill${isComplete ? ' due-pill-done' : ''}`}>{isComplete ? 'Done' : item.due}</span>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

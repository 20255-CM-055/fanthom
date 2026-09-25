const avatarColors = ['#e8e4ff', '#dff2ec', '#ffebdc', '#e1efff', '#fbe5ed', '#e9edf3']

export function initials(name) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function ParticipantAvatars({ participants, limit = 4 }) {
  const visibleParticipants = participants.slice(0, limit)
  const hiddenCount = participants.length - visibleParticipants.length

  return (
    <div className="avatar-stack" aria-label={`${participants.length} participants`}>
      {visibleParticipants.map((participant, index) => (
        <span
          className="participant-avatar"
          key={participant.name}
          title={`${participant.name} · ${participant.role}`}
          style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
        >
          {initials(participant.name)}
        </span>
      ))}
      {hiddenCount > 0 && <span className="participant-overflow">+{hiddenCount}</span>}
    </div>
  )
}

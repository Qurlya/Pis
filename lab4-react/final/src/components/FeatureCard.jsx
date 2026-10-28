function FeatureCard({ title, text, isSelected, onToggle, index = 0 }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className={isSelected ? 'feature-card selected' : 'feature-card'}
      style={{ animationDelay: `${index * 90}ms` }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      <span className="feature-card__check" aria-hidden="true">
        <span
          className={
            isSelected
              ? 'feature-card__icon feature-card__icon--check'
              : 'feature-card__icon feature-card__icon--plus'
          }
        ></span>
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default FeatureCard

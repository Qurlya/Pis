function FeatureCard({ title, text, isSelected, onToggle }) {
  return (
    <div
      className={isSelected ? 'feature-card selected' : 'feature-card'}
      onClick={onToggle}
    >
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default FeatureCard

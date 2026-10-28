import { useEffect, useState } from 'react'

const PROMO_TOTAL_SECONDS = 300

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

function PromoCard({ onOpenModal }) {
  const [secondsLeft, setSecondsLeft] = useState(PROMO_TOTAL_SECONDS)

  useEffect(() => {
    if (secondsLeft === 0) {
      return
    }

    const id = setTimeout(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0))
    }, 1000)

    return () => clearTimeout(id)
  }, [secondsLeft])

  const progressPercent = (secondsLeft / PROMO_TOTAL_SECONDS) * 100

  return (
    <section className="promo">
      <div className="promo-card">
        <span className="badge">
          {secondsLeft > 0 ? 'Скидка 10%' : 'Акция завершена'}
        </span>
        <p className="promo-subtitle">До конца акции осталось:</p>
        <span className="promo-timer">{formatTime(secondsLeft)}</span>
        <div className="promo-progress-wrap">
          <div
            className="promo-progress"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <h2>Специальное предложение</h2>
        <p>Оставьте заявку прямо сейчас — расскажем обо всех деталях.</p>
        <button
          type="button"
          className="btn promo-btn"
          onClick={onOpenModal}
        >
          Узнать подробнее
        </button>
      </div>
    </section>
  )
}

export default PromoCard

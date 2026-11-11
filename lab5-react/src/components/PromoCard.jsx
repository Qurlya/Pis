import { useEffect, useState } from 'react'

const PROMO_TOTAL_SECONDS = 300
const PROMO_CODE = 'GALERIE10'

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

function legacyCopy() {
  const field = document.createElement('textarea')
  let isCopied = false

  field.value = PROMO_CODE
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()

  try {
    isCopied = document.execCommand('copy')
  } catch (error) {
    console.log('Резервное копирование недоступно:', error)
  }

  document.body.removeChild(field)

  return isCopied
}

function PromoCard({ onOpenModal }) {
  const [secondsLeft, setSecondsLeft] = useState(PROMO_TOTAL_SECONDS)
  const [copyState, setCopyState] = useState('idle')

  useEffect(() => {
    if (secondsLeft === 0) {
      return
    }

    const id = setTimeout(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0))
    }, 1000)

    return () => clearTimeout(id)
  }, [secondsLeft])

  useEffect(() => {
    if (copyState === 'idle') {
      return
    }

    const id = setTimeout(() => setCopyState('idle'), 2200)

    return () => clearTimeout(id)
  }, [copyState])

  const progressPercent = (secondsLeft / PROMO_TOTAL_SECONDS) * 100

  async function handleCopy() {
    let isCopied = false

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROMO_CODE)
        isCopied = true
      }
    } catch (error) {
      console.log('Буфер обмена недоступен, пробуем резервный способ:', error)
    }

    if (!isCopied) {
      isCopied = legacyCopy()
    }

    setCopyState(isCopied ? 'copied' : 'error')
  }

  const copyLabel =
    copyState === 'copied'
      ? 'Скопировано ✓'
      : copyState === 'error'
        ? 'Не удалось'
        : 'Скопировать'

  const copyClassName =
    copyState === 'copied'
      ? 'promo-code__copy is-copied'
      : copyState === 'error'
        ? 'promo-code__copy is-error'
        : 'promo-code__copy'

  return (
    <section className="promo" id="promo">
      <div className="promo-card">
        <span
          className={
            secondsLeft > 0 ? 'badge badge--pulse' : 'badge badge--ended'
          }
        >
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

        <div className="promo-code">
          <span className="promo-code__label">Промокод</span>
          <code>{PROMO_CODE}</code>
          <button
            type="button"
            className={copyClassName}
            onClick={handleCopy}
          >
            {copyLabel}
          </button>
        </div>

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

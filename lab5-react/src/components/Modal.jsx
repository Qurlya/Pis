import { useEffect, useRef } from 'react'

const modalities = [
  'Скидка 10% на услуги салонов и кинотеатра',
  'Промокод действует до конца акции',
  'Покажите промокод на кассе или администратору',
]

function Modal({ onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    if (closeButtonRef.current !== null) {
      closeButtonRef.current.focus()
    }

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ✕
        </button>

        <span className="modal-badge">−10%</span>
        <h2 id="modal-title">Специальное предложение</h2>
        <p>
          Скидка 10% на услуги ТЦ «Галерея» действует до конца акции.
        </p>

        <div className="modal-promo">
          <span>Ваш промокод</span>
          <code>GALERIE10</code>
        </div>

        <ul className="modal-list">
          {modalities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button type="button" className="btn modal-action" onClick={onClose}>
          Отлично, спасибо
        </button>
      </div>
    </div>
  )
}

export default Modal

function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ✕
        </button>
        <h2>Специальное предложение</h2>
        <p>
          Скидка 10% на услуги ТЦ «Галерея» действует до конца акции.
        </p>
        <p>
          Оставьте заявку в форме на главной странице — мы свяжемся с вами и
          расскажем подробности.
        </p>
        <button type="button" className="btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default Modal

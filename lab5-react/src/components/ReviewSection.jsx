import { useState } from 'react'

const REVIEW_URL = 'https://jsonplaceholder.typicode.com/comments?_limit=1'

function ReviewSection() {
  const [review, setReview] = useState(
    'Нажмите кнопку, чтобы загрузить отзыв',
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLoadReview() {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(REVIEW_URL)

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      const comments = await response.json()
      const comment = comments[0]

      setReview(`«${comment.body}» — ${comment.email}`)
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'неизвестная ошибка'

      setError(`Не удалось загрузить отзыв: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const contentClassName = isLoading
    ? 'review-content review-content--loading'
    : error
      ? 'review-content review-content--error'
      : 'review-content'

  return (
    <section className="review">
      <h2>Отзыв клиента</h2>

      <div className={contentClassName} aria-live="polite">
        {isLoading ? (
          <span className="review-loading">
            <span className="spinner" aria-hidden="true"></span>
            Загрузка отзыва...
          </span>
        ) : error ? (
          error
        ) : (
          <span key={review} className="review-text">
            {review}
          </span>
        )}
      </div>

      <button
        type="button"
        className="btn load-review-btn"
        onClick={handleLoadReview}
        disabled={isLoading}
      >
        {isLoading ? 'Загружаем…' : 'Показать отзыв'}
      </button>
    </section>
  )
}

export default ReviewSection

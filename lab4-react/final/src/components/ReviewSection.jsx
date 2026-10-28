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

  return (
    <section className="review">
      <h2>Отзыв клиента</h2>
      <div className="review-content">
        {isLoading ? 'Загрузка отзыва...' : error ? error : review}
      </div>
      <button
        type="button"
        className="btn load-review-btn"
        onClick={handleLoadReview}
        disabled={isLoading}
      >
        Показать отзыв
      </button>
    </section>
  )
}

export default ReviewSection

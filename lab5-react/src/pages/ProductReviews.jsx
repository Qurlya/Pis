import { useParams } from 'react-router-dom'
import { shops } from '../data/shops'

function Stars({ value }) {
  return (
    <span className="stars" aria-label={`Оценка ${value} из 5`}>
      {'★'.repeat(value)}
      <span className="stars__empty">{'★'.repeat(5 - value)}</span>
    </span>
  )
}

// Вкладка «Отзывы» (вложенный маршрут /product/:id/reviews)
function ProductReviews() {
  const { id } = useParams()
  const shop = shops.find((item) => item.id === Number(id))

  // Средняя оценка: сумма оценок / количество отзывов
  const total = shop.reviews.reduce((sum, review) => sum + review.rating, 0)
  const average = total / shop.reviews.length

  return (
    <div className="reviews">
      <div className="reviews__summary">
        <strong>{average.toFixed(1)}</strong>
        <div>
          <Stars value={Math.round(average)} />
          <span>на основе {shop.reviews.length} отз.</span>
        </div>
      </div>

      <ul className="reviews__list">
        {shop.reviews.map((review) => (
          <li key={review.id} className="review-item">
            <div className="review-item__head">
              <span className="review-item__avatar" aria-hidden="true">
                {review.author[0]}
              </span>
              <strong>{review.author}</strong>
              <Stars value={review.rating} />
            </div>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductReviews

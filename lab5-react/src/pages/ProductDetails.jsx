import { useParams } from 'react-router-dom'
import { shops } from '../data/shops'

// Вкладка «Описание» (index-маршрут /product/:id)
function ProductDetails() {
  const { id } = useParams()
  const shop = shops.find((item) => item.id === Number(id))

  return (
    <div className="details">
      <p className="details__text">{shop.description}</p>

      <h3>Особенности</h3>
      <ul className="details__list">
        {shop.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductDetails

import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { shops } from '../data/shops'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // id из адреса — всегда строка, поэтому приводим к числу
  const shop = shops.find((item) => item.id === Number(id))

  if (shop === undefined) {
    return (
      <main className="page">
        <section className="not-found not-found--small">
          <span className="not-found__code">?</span>
          <h2>Магазин не найден</h2>
          <p>В каталоге нет заведения с номером {id}.</p>
          <Link to="/catalog" className="btn">
            Вернуться в каталог
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page page--product">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <span aria-hidden="true">←</span> Назад
      </button>

      <section className="product-head" style={{ '--accent': shop.color }}>
        <span className="product-head__icon" aria-hidden="true">
          {shop.icon}
        </span>
        <div>
          <span className="shop-card__category">{shop.category}</span>
          <h2>{shop.name}</h2>
          <p className="product-head__meta">
            <span>📍 {shop.floor} этаж</span>
            <span>🕒 {shop.hours}</span>
            <span>💬 {shop.reviews.length} отз.</span>
          </p>
        </div>
      </section>

      {/* Вкладки: to="" — адрес самого товара, end — чтобы «Описание»
          не оставалось активным на /reviews.
          replace — переключение вкладки заменяет запись в истории,
          а не добавляет новую, поэтому «Назад» ведёт в каталог */}
      <nav className="tabs" aria-label="Разделы страницы">
        <NavLink to="" end replace className="tab">
          Описание
        </NavLink>
        <NavLink to="reviews" replace className="tab">
          Отзывы
        </NavLink>
      </nav>

      <div className="tab-panel">
        <Outlet />
      </div>
    </main>
  )
}

export default ProductPage

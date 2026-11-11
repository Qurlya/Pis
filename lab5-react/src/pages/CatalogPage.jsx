import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, shops } from '../data/shops'
import Reveal from '../components/Reveal'

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [search, setSearch] = useState('')

  // Отбираем магазины по категории и по тексту поиска
  const visibleShops = shops.filter((shop) => {
    const matchesCategory =
      activeCategory === 'Все' || shop.category === activeCategory
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className="page page--catalog">
      <section className="page-hero">
        <span className="section-eyebrow">Каталог</span>
        <h2>Магазины и сервисы</h2>
        <p>
          Выберите заведение, чтобы узнать подробности, часы работы и отзывы
          посетителей.
        </p>
      </section>

      <section className="catalog-toolbar" aria-label="Фильтры каталога">
        <div className="chips">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                category === activeCategory ? 'chip chip--active' : 'chip'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="catalog-search"
          placeholder="Поиск по названию…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Поиск по названию"
        />
      </section>

      <p className="catalog-count">Найдено: {visibleShops.length}</p>

      {visibleShops.length === 0 ? (
        <div className="catalog-empty">
          <span aria-hidden="true">🔍</span>
          <p>Ничего не найдено. Попробуйте другую категорию или запрос.</p>
        </div>
      ) : (
        <Reveal>
          <div className="catalog-grid">
            {visibleShops.map((shop) => (
              <Link
                key={shop.id}
                to={`/product/${shop.id}`}
                className="shop-card"
                style={{ '--accent': shop.color }}
              >
                <span className="shop-card__icon" aria-hidden="true">
                  {shop.icon}
                </span>
                <span className="shop-card__category">{shop.category}</span>
                <h3>{shop.name}</h3>
                <p>{shop.short}</p>
                <span className="shop-card__meta">
                  {shop.floor} этаж · {shop.hours}
                </span>
                <span className="shop-card__more">
                  Подробнее <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </main>
  )
}

export default CatalogPage

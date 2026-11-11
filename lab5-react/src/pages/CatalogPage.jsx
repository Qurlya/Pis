import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, shops } from '../data/shops'
import Reveal from '../components/Reveal'

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'name', label: 'По названию (А–Я)' },
  { value: 'floor', label: 'По этажу' },
  { value: 'rating', label: 'По рейтингу' },
]

function getAverageRating(shop) {
  const total = shop.reviews.reduce((sum, review) => sum + review.rating, 0)

  return total / shop.reviews.length
}

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Отбираем магазины по категории и по тексту поиска
  const filteredShops = shops.filter((shop) => {
    const matchesCategory =
      activeCategory === 'Все' || shop.category === activeCategory
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Сортировка не меняет исходный массив shops
  const visibleShops = [...filteredShops].sort((first, second) => {
    if (sortBy === 'name') {
      return first.name.localeCompare(second.name, 'ru')
    }
    if (sortBy === 'floor') {
      return first.floor - second.floor
    }
    if (sortBy === 'rating') {
      return getAverageRating(second) - getAverageRating(first)
    }

    return 0
  })

  const isFiltered =
    activeCategory !== 'Все' || search.trim() !== '' || sortBy !== 'default'

  function handleResetFilters() {
    setActiveCategory('Все')
    setSearch('')
    setSortBy('default')
  }

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

        <div className="catalog-controls">
          <div className="catalog-sort">
            <span className="catalog-sort__select-wrap">
              <select
                id="catalog-sort"
                className="catalog-sort__select"
                aria-label="Сортировка"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="catalog-sort__chevron" aria-hidden="true">
                ▾
              </span>
            </span>
          </div>

          <div className="catalog-controls__actions">
            <input
              type="search"
              className="catalog-search"
              placeholder="Поиск по названию…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Поиск по названию"
            />

            <button
              type="button"
              className="catalog-reset"
              onClick={handleResetFilters}
              disabled={!isFiltered}
            >
              <span aria-hidden="true">↺</span>
              Сбросить
            </button>
          </div>
        </div>
      </section>

      <p className="catalog-count" aria-live="polite">
        Найдено: {visibleShops.length}
        {visibleShops.length !== shops.length && ` из ${shops.length}`}
      </p>

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

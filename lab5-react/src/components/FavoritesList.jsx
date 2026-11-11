function FavoritesList({ favorites, onRemove, onClear }) {
  return (
    <section className="favorites">
      <div className="favorites__header">
        <h2>
          Избранное
          <span className="favorites__count" aria-label="Количество в избранном">
            {favorites.length}
          </span>
        </h2>

        {favorites.length > 0 && (
          <button
            type="button"
            className="btn btn-reset favorites__clear"
            onClick={onClear}
          >
            Очистить всё
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li key={item.id} className="fav-in">
              <span className="favorites-list__title">{item.title}</span>
              <button
                type="button"
                className="remove-fav-btn"
                onClick={() => onRemove(item.id)}
                aria-label={`Убрать «${item.title}» из избранного`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="favorites-empty">
          <span className="favorites-empty__icon" aria-hidden="true">
            ☆
          </span>
          <p>Пока пусто</p>
          <span className="favorites-empty__hint">
            Нажмите на карточку преимущества, чтобы добавить её в избранное.
          </span>
        </div>
      )}
    </section>
  )
}

export default FavoritesList

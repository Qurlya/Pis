function FavoritesList({ favorites, onRemove }) {
  return (
    <section className="favorites">
      <h2>Избранное</h2>

      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li key={item.id} className="fav-in">
              {item.title}
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
        <p className="favorites-empty">Пока пусто</p>
      )}
    </section>
  )
}

export default FavoritesList

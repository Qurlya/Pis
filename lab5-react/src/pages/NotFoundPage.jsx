import { Link } from 'react-router-dom'

// Срабатывает на любой адрес, не подошедший ни одному маршруту (path="*")
function NotFoundPage() {
  return (
    <main className="page">
      <section className="not-found">
        <span className="not-found__code">404</span>
        <h2>Страница не найдена</h2>
        <p>
          Похоже, вы свернули не в тот коридор. Такой страницы в ТЦ «Галерея»
          нет.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn">
            На главную
          </Link>
          <Link to="/catalog" className="btn btn-reset">
            Открыть каталог
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage

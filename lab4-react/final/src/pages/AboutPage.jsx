function AboutPage({ onNavigate, onOpenModal }) {
  return (
    <main>
      <section className="hero about-hero">
        <div>
          <h2>О ТЦ «Галерея»</h2>
          <p>
            «Галерея» — пространство для покупок, отдыха и встреч в центре
            города.
          </p>
        </div>
      </section>

      <section className="food-court">
        <div className="food-court-copy">
          <h2>Больше, чем торговый центр</h2>
          <p>
            В «Галерее» собраны магазины одежды и техники, салоны красоты,
            кинотеатр и фуд-корт. Мы создаём удобную среду для всей семьи:
            проводим мероприятия, следим за безопасностью и поддерживаем
            комфортную атмосферу каждый день.
          </p>
          <ul className="food-court-list">
            <li>Более 150 магазинов и сервисов</li>
            <li>Кинотеатр и детская игровая зона</li>
            <li>Удобная парковка для посетителей</li>
            <li>Ежедневно с 10:00 до 22:00</li>
          </ul>
          <div className="about-actions">
            <button
              type="button"
              className="btn"
              onClick={() => onNavigate('home')}
            >
              На главную
            </button>
            <button
              type="button"
              className="btn btn-reset"
              onClick={onOpenModal}
            >
              Узнать об акции
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage

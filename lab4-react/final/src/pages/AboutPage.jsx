import Reveal from '../components/Reveal'

const stats = [
  { id: 'shops', value: '150+', label: 'магазинов и сервисов' },
  { id: 'area', value: '38 000', label: 'м² торговых площадей' },
  { id: 'guests', value: '12 000', label: 'гостей ежедневно' },
  { id: 'years', value: '8', label: 'лет в центре города' },
]

const facts = [
  'Более 150 магазинов и сервисов',
  'Кинотеатр и детская игровая зона',
  'Удобная парковка для посетителей',
  'Ежедневно с 10:00 до 22:00',
]

function AboutPage({ onNavigate, onOpenModal }) {
  return (
    <main className="page page--about">
      <section className="hero about-hero">
        <span className="hero__glow hero__glow--one" aria-hidden="true"></span>
        <span className="hero__glow hero__glow--two" aria-hidden="true"></span>
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__dot" aria-hidden="true"></span>
            Знакомьтесь ближе
          </span>
          <h2 className="hero__title">О ТЦ «Галерея»</h2>
          <p className="hero__subtitle">
            «Галерея» — пространство для покупок, отдыха и встреч в центре
            города.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="stats" aria-label="ТЦ «Галерея» в цифрах">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      </Reveal>

      <Reveal>
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
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
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
      </Reveal>
    </main>
  )
}

export default AboutPage

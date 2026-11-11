import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

function AboutPage({ onOpenModal }) {
  // Хук вызывается в начале компонента, а сама функция navigate —
  // только внутри обработчика отправки формы
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (name.trim() === '' || message.trim() === '') {
      setError('Заполните имя и текст сообщения')
      return
    }

    // здесь могла бы быть отправка данных на сервер (ЛР3, Fetch API)
    navigate('/')
  }

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
              <Link to="/catalog" className="btn">
                Смотреть каталог
              </Link>
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

      <Reveal>
        <section className="form-section feedback">
          <h2>Написать администрации</h2>
          <p className="form-lead">
            Есть предложение или вопрос? После отправки вы вернётесь на главную
            страницу.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="required" htmlFor="fb-name">
                Имя
              </label>
              <input
                id="fb-name"
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setError('')
                }}
              />
            </div>

            <div className="form-field">
              <label className="required" htmlFor="fb-message">
                Сообщение
              </label>
              <textarea
                id="fb-message"
                rows="4"
                placeholder="Напишите, что хотели бы улучшить"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value)
                  setError('')
                }}
              ></textarea>
            </div>

            {error !== '' && <p className="form-status error">{error}</p>}

            <div className="form-buttons">
              <button type="submit" className="btn">
                Отправить
              </button>
            </div>
          </form>
        </section>
      </Reveal>
    </main>
  )
}

export default AboutPage

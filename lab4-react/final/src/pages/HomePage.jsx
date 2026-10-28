import FeatureCard from '../components/FeatureCard'
import FavoritesList from '../components/FavoritesList'
import FoodCourt from '../components/FoodCourt'
import PromoCard from '../components/PromoCard'
import ReviewSection from '../components/ReviewSection'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

const services = [
  {
    id: 'shops',
    icon: '🛍️',
    title: 'Магазины',
    text: 'Одежда, обувь, электроника и товары для дома — более 150 брендов.',
  },
  {
    id: 'cinema',
    icon: '🎬',
    title: 'Кинотеатр',
    text: 'Четыре зала с современным звуком и премьерами каждую неделю.',
  },
  {
    id: 'food',
    icon: '🍽️',
    title: 'Фуд-корт',
    text: 'Кухни мира, кофейни и десерты на 400 посадочных мест.',
  },
  {
    id: 'beauty',
    icon: '✂️',
    title: 'Салоны красоты',
    text: 'Стрижки, маникюр, косметология и спа-процедуры.',
  },
  {
    id: 'kids',
    icon: '🧸',
    title: 'Детская зона',
    text: 'Игровая площадка с аниматорами, пока родители за покупками.',
  },
  {
    id: 'parking',
    icon: '🚗',
    title: 'Парковка и Wi-Fi',
    text: 'Бесплатная парковка на 300 мест и быстрый интернет.',
  },
]

function HomePage({
  features,
  favorites,
  onToggleFavorite,
  onRemoveFavorite,
  onClearFavorites,
  onOpenModal,
  onNavigate,
}) {
  return (
    <main className="page page--home">
      <section className="hero">
        <span className="hero__glow hero__glow--one" aria-hidden="true"></span>
        <span className="hero__glow hero__glow--two" aria-hidden="true"></span>

        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__dot" aria-hidden="true"></span>
            Открыто ежедневно · 10:00–22:00
          </span>

          <h2 className="hero__title">
            Сотни магазинов и развлечений{' '}
            <span className="hero__accent">под одной крышей</span>
          </h2>

          <p className="hero__subtitle">
            Покупки, кино, фуд-корт и события для всей семьи в самом центре
            города.
          </p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn hero__cta"
              onClick={() => onNavigate('services')}
            >
              Смотреть услуги
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="btn btn-reset hero__ghost"
              onClick={() => onNavigate('contacts')}
            >
              Связаться с нами
            </button>
          </div>

          <ul className="hero__facts">
            <li>
              <strong>150+</strong> магазинов
            </li>
            <li>
              <strong>20</strong> кафе и ресторанов
            </li>
            <li>
              <strong>400</strong> мест на фуд-корте
            </li>
          </ul>
        </div>
      </section>

      <Reveal>
        <section className="advantages">
          <div className="section-head section-head--compact">
            <span className="section-eyebrow">Наши принципы</span>
            <h2>Почему выбирают «Галерею»</h2>
          </div>

          <div className="features">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                text={feature.text}
                isSelected={favorites.some((item) => item.id === feature.id)}
                onToggle={() => onToggleFavorite(feature)}
                index={index}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FavoritesList
          favorites={favorites}
          onRemove={onRemoveFavorite}
          onClear={onClearFavorites}
        />
      </Reveal>

      <Reveal>
        <section className="services" id="services">
          <div className="section-head">
            <span className="section-eyebrow">Что вас ждёт</span>
            <h2>Услуги ТЦ «Галерея»</h2>
            <p>Всё для покупок, отдыха и полезных дел — в одном месте.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <span className="service-card__icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FoodCourt />
      </Reveal>

      <Reveal>
        <PromoCard onOpenModal={onOpenModal} />
      </Reveal>

      <Reveal>
        <ReviewSection />
      </Reveal>

      <Reveal>
        <ContactForm />
      </Reveal>
    </main>
  )
}

export default HomePage

import FeatureCard from '../components/FeatureCard'
import FavoritesList from '../components/FavoritesList'
import FoodCourt from '../components/FoodCourt'
import PromoCard from '../components/PromoCard'
import ReviewSection from '../components/ReviewSection'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

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
        <section className="features" id="services">
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

import FeatureCard from '../components/FeatureCard'
import FavoritesList from '../components/FavoritesList'
import FoodCourt from '../components/FoodCourt'
import PromoCard from '../components/PromoCard'
import ReviewSection from '../components/ReviewSection'
import ContactForm from '../components/ContactForm'

function HomePage({
  features,
  favorites,
  onToggleFavorite,
  onRemoveFavorite,
  onOpenModal,
}) {
  return (
    <main>
      <section className="hero">
        <p>Сотни магазинов и развлечений под одной крышей.</p>
      </section>

      <section className="features">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            text={feature.text}
            isSelected={favorites.some((item) => item.id === feature.id)}
            onToggle={() => onToggleFavorite(feature)}
          />
        ))}
      </section>

      <FavoritesList favorites={favorites} onRemove={onRemoveFavorite} />
      <FoodCourt />
      <PromoCard onOpenModal={onOpenModal} />
      <ReviewSection />
      <ContactForm />
    </main>
  )
}

export default HomePage

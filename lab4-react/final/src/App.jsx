import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Modal from './components/Modal'
import './App.css'

const features = [
  {
    id: 'quality',
    title: 'Качество',
    text: 'Мы тщательно следим за каждой деталью.',
  },
  {
    id: 'speed',
    title: 'Скорость',
    text: 'Быстро решаем любые вопросы клиентов.',
  },
  {
    id: 'care',
    title: 'Забота о клиенте',
    text: 'Индивидуальный подход к каждому.',
  },
]

function App() {
  const [screen, setScreen] = useState('home')
  const [activeNav, setActiveNav] = useState('home')
  const [favorites, setFavorites] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleNavigate(target) {
    setActiveNav(target)
    setScreen(target === 'about' ? 'about' : 'home')
  }

  function handleToggleFavorite(feature) {
    setFavorites((current) =>
      current.some((item) => item.id === feature.id)
        ? current.filter((item) => item.id !== feature.id)
        : [...current, feature],
    )
  }

  function handleRemoveFavorite(id) {
    setFavorites((current) => current.filter((item) => item.id !== id))
  }

  return (
    <>
      <Header activeNav={activeNav} onNavigate={handleNavigate} />
      {screen === 'home' ? (
        <HomePage
          features={features}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onOpenModal={() => setIsModalOpen(true)}
        />
      ) : (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}
      <Footer />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default App

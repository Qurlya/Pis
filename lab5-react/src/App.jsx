import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
import BackToTop from './components/BackToTop'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import ProductDetails from './pages/ProductDetails'
import ProductReviews from './pages/ProductReviews'
import NotFoundPage from './pages/NotFoundPage'
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
  // Переменная screen из ЛР4 больше не нужна — экран выбирает React Router.
  const [favorites, setFavorites] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  function handleClearFavorites() {
    setFavorites([])
  }

  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              features={features}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              onClearFavorites={handleClearFavorites}
              onOpenModal={openModal}
            />
          }
        />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />}>
          <Route index element={<ProductDetails />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Route>
        <Route path="/about" element={<AboutPage onOpenModal={openModal} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <BackToTop />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default App

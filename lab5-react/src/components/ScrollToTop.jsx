import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// При смене адреса прокручивает страницу наверх.
// Без этого при переходе из низа главной в каталог
// новая страница открылась бы с той же прокруткой.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

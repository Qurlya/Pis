import { useEffect, useState } from 'react'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(() => window.scrollY > 480)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 480)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={
        isVisible ? 'back-to-top back-to-top--visible' : 'back-to-top'
      }
      onClick={handleClick}
      aria-label="Вернуться наверх"
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}

export default BackToTop

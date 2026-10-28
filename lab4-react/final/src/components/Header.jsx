import { useEffect, useState } from 'react'

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]

function Header({ activeNav, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function handleItemClick(event, id) {
    event.preventDefault()
    setIsMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header
      className={
        isScrolled ? 'site-header site-header--scrolled' : 'site-header'
      }
    >
      <div className="site-header__inner">
        <h1 className="brand">
          <a
            href="#"
            className="brand__link"
            onClick={(event) => handleItemClick(event, 'home')}
          >
            <span className="brand__mark" aria-hidden="true">
              Г
            </span>
            <span className="brand__text">ТЦ «Галерея»</span>
          </a>
        </h1>

        <button
          type="button"
          className={isMenuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <nav
          id="site-nav"
          className={isMenuOpen ? 'nav nav--open' : 'nav'}
          aria-label="Основная навигация"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={activeNav === item.id ? 'active' : ''}
              onClick={(event) => handleItemClick(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

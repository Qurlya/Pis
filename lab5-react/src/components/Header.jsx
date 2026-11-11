import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О нас' },
]

function Header() {
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

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={
        isScrolled ? 'site-header site-header--scrolled' : 'site-header'
      }
    >
      <div className="site-header__inner">
        <h1 className="brand">
          <Link to="/" className="brand__link" onClick={closeMenu}>
            <span className="brand__mark" aria-hidden="true">
              Г
            </span>
            <span className="brand__text">ТЦ «Галерея»</span>
          </Link>
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
          {/* NavLink сам добавляет класс active текущему пункту.
              end у "/" — чтобы «Главная» не подсвечивалась на всех адресах. */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

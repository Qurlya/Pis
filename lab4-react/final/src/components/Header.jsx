const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]

function Header({ activeNav, onNavigate }) {
  return (
    <header>
      <h1>ТЦ «Галерея»</h1>
      <nav className="nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={activeNav === item.id ? 'active' : ''}
            onClick={(event) => {
              event.preventDefault()
              onNavigate(item.id)
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header

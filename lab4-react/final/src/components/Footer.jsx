import { useEffect, useState } from 'react'

function Footer() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <footer>
      <p>
        Текущее время: <span className="site-clock">{time}</span>
      </p>
      <p>&copy; 2026 ТЦ «Галерея».</p>
    </footer>
  )
}

export default Footer

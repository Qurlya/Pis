import { useState } from 'react'

const STORAGE_KEY = 'galerie-lead'

const EMPTY_FORM = {
  name: '',
  email: '',
  password: '',
  phone: '',
  visitTime: '',
  news: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+7 \([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}$/

function formatPhone(value) {
  const digits = value.replace(/\D/g, '')

  if (digits === '') {
    return ''
  }

  let normalized = digits

  if (normalized[0] === '8' || normalized[0] === '9') {
    normalized =
      '7' + (normalized[0] === '9' ? normalized : normalized.substring(1))
  } else if (normalized[0] !== '7') {
    normalized = '7' + normalized
  }

  let result = '+7 '

  if (normalized.length > 1) {
    result += '(' + normalized.substring(1, 4)
  }
  if (normalized.length >= 5) {
    result += ')-' + normalized.substring(4, 7)
  }
  if (normalized.length >= 8) {
    result += '-' + normalized.substring(7, 9)
  }
  if (normalized.length >= 10) {
    result += '-' + normalized.substring(9, 11)
  }

  return result
}

function getInitialForm() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved === null) {
    return { ...EMPTY_FORM }
  }

  try {
    const savedData = JSON.parse(saved)

    return {
      ...EMPTY_FORM,
      name: savedData.name || '',
      email: savedData.email || '',
      password: savedData.password || '',
      phone: savedData.phone || '',
    }
  } catch (error) {
    console.log('Не удалось прочитать сохранённые данные формы:', error)
    return { ...EMPTY_FORM }
  }
}

function ContactForm() {
  const [formData, setFormData] = useState(getInitialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ message: '', type: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const nextValue = name === 'phone' ? formatPhone(value) : value

    setFormData((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: false }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (formData.name.trim() === '') {
      nextErrors.name = true
    }
    if (!EMAIL_PATTERN.test(formData.email)) {
      nextErrors.email = true
    }
    if (formData.password.trim() === '') {
      nextErrors.password = true
    }
    if (!PHONE_PATTERN.test(formData.phone)) {
      nextErrors.phone = true
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        message: 'Пожалуйста, корректно заполните все выделенные поля',
        type: 'error',
      })
      return
    }

    if (formData.visitTime === '' || formData.news === '') {
      setStatus({
        message: 'Выберите вариант в обеих группах радиокнопок',
        type: 'error',
      })
      return
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      }),
    )
    setStatus({ message: 'Заявка успешно отправлена!', type: 'success' })
  }

  function handleReset() {
    setFormData(EMPTY_FORM)
    setErrors({})
    setStatus({ message: '', type: '' })
    localStorage.removeItem(STORAGE_KEY)
  }

  const statusClassName =
    status.type === '' ? 'form-status' : `form-status ${status.type}`

  return (
    <section className="form-section">
      <h2>Оставить заявку</h2>

      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <div className="form-field">
          <label className="required" htmlFor="fname">
            Имя
          </label>
          <input
            type="text"
            id="fname"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error-input' : ''}
            required
          />
        </div>

        <div className="form-field">
          <label className="required" htmlFor="femail">
            Email
          </label>
          <input
            type="email"
            id="femail"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
            required
          />
        </div>

        <div className="form-field">
          <label className="required" htmlFor="fpass">
            Пароль
          </label>
          <input
            type="password"
            id="fpass"
            name="password"
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error-input' : ''}
            required
          />
        </div>

        <div className="form-field">
          <label className="required" htmlFor="fphone">
            Телефон
          </label>
          <input
            type="tel"
            id="fphone"
            name="phone"
            placeholder="+7 (900)-000-00-00"
            pattern="\+7 \([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            title="Введите номер в формате +7 (900)-000-00-00"
            maxLength="18"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error-input' : ''}
            required
          />
        </div>

        <fieldset className="radio-group">
          <legend>Удобное время визита</legend>
          <label htmlFor="time_morning">
            <input
              type="radio"
              id="time_morning"
              name="visitTime"
              value="morning"
              checked={formData.visitTime === 'morning'}
              onChange={handleChange}
            />
            Утро
          </label>
          <label htmlFor="time_day">
            <input
              type="radio"
              id="time_day"
              name="visitTime"
              value="day"
              checked={formData.visitTime === 'day'}
              onChange={handleChange}
            />
            День
          </label>
          <label htmlFor="time_evening">
            <input
              type="radio"
              id="time_evening"
              name="visitTime"
              value="evening"
              checked={formData.visitTime === 'evening'}
              onChange={handleChange}
            />
            Вечер
          </label>
        </fieldset>

        <fieldset className="radio-group">
          <legend>Получать новости о скидках?</legend>
          <label htmlFor="news_yes">
            <input
              type="radio"
              id="news_yes"
              name="news"
              value="yes"
              checked={formData.news === 'yes'}
              onChange={handleChange}
            />
            Да
          </label>
          <label htmlFor="news_no">
            <input
              type="radio"
              id="news_no"
              name="news"
              value="no"
              checked={formData.news === 'no'}
              onChange={handleChange}
            />
            Нет
          </label>
        </fieldset>

        <div className="form-buttons">
          <button type="submit" className="btn">
            Отправить заявку
          </button>
          <button type="reset" className="btn btn-reset">
            Очистить
          </button>
        </div>
      </form>

      <div className={statusClassName}>{status.message}</div>
    </section>
  )
}

export default ContactForm

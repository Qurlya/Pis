// ЛАБОРАТОРНАЯ РАБОТА №4
// ТЕМА 7: Формы (controlled components) — Вариант 03
// Тема варианта: Зоомагазин «Лапки»
//
// Выполняйте задание прямо в своём App.jsx.
// Все TODO — ниже, по возрастанию сложности.

// --- Лёгкий уровень ---

// TODO 1: Контролируемое поле
// Заведите const [customerName, setCustomerName] = useState("") и
// сделайте поле <input> для имени покупателя контролируемым — value и
// onChange оба привязаны к customerName.



// TODO 2: value без onChange
// Дан код с ошибкой:
//
//   <input value={customerName} />
//
// Запустите — попробуйте печатать в поле. Объясните в комментарии, что
// произошло и почему, затем исправьте (верните onChange).

// Подсказка: без onChange React не знает, как обновлять customerName —
// поле "замерзает" с тем значением, что было при первом рендере.

// Ответ: без onChange значение customerName никогда не меняется, а React
// при каждом вводе возвращает в поле старое значение из value. Поэтому
// поле становится фактически доступным только для чтения.



// --- Средний уровень ---

// TODO 3: Кнопка «Очистить»
// Добавьте кнопку рядом с полем, которая вызывает setCustomerName("") —
// убедитесь, что поле реально визуально очищается (это доказательство,
// что поле контролируемое).



// TODO 4: <form> и onSubmit
// Оберните поле в <form onSubmit={handleSubmit}>, где handleSubmit
// вызывает e.preventDefault() и выводит в консоль
// "Заказ от " + customerName + " в «Зоомагазин «Лапки»»".



// TODO 5: Второе поле в той же форме
// Добавьте ещё одно контролируемое поле — количество товара
// "Корм для кошек" (const [quantity, setQuantity] = useState(1)). При
// отправке формы (TODO 4) выведите в консоль объект вместе с обоими
// полями: { customerName, quantity }.



// TODO 6: Простая проверка перед отправкой
// В handleSubmit — если customerName пустая строка, не выводите заказ в
// консоль, а вместо этого выведите "Введите имя!". Используйте обычный
// if внутри функции (не в JSX — это разрешено, если/else в обработчиках
// пишутся свободно, ограничение только на JSX-разметку).

import { useState } from 'react'

function App() {
  const [customerName, setCustomerName] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (customerName === "") {
      console.log("Введите имя!")
      return
    }

    console.log("Заказ от " + customerName + " в «Зоомагазин «Лапки»»")
    console.log({ customerName, quantity })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Имя покупателя"
      />
      <button type="button" onClick={() => setCustomerName("")}>
        Очистить
      </button>

      <label>
        Количество «Корм для кошек»
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      <button type="submit">Отправить</button>
    </form>
  )
}

// --- Задача уровня собеседования ---

// TODO 7: "Единственный источник истины"
// Опишите в комментарии (2-3 предложения): что означает фраза "state —
// единственный источник истины" применительно к вашему полю
// customerName? Что бы изменилось, если убрать value и оставить только
// onChange?

// Подсказка: вспомните тему 7 методички — без value само поле хранило
// бы значение в DOM отдельно от state, это уже неконтролируемый
// компонент.

// Ответ: значение поля хранится в state customerName, а value лишь
// отображает его, поэтому state — единственный источник истины. Если
// убрать value, поле станет неконтролируемым: DOM будет хранить своё
// значение, которое может расходиться с state.

export default App

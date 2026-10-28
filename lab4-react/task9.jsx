// ЛАБОРАТОРНАЯ РАБОТА №4
// ТЕМА 9: Подъём состояния (lifting state up) — Вариант 03
// Тема варианта: Зоомагазин «Лапки»
//
// Выполняйте задание прямо в своём App.jsx.
// Все TODO — ниже, по возрастанию сложности.

// --- Лёгкий уровень ---

// TODO 1: Два компонента-соседа через общего родителя
// Создайте два отдельных компонента:
//   CartCount({ count }) — просто выводит <p>В корзине: {count}</p>
//   AddButton({ onAdd }) — кнопка "Добавить Корм для кошек", вызывающая onAdd по клику
// В App заведите const [cartCount, setCartCount] = useState(0) и
// свяжите оба компонента через него: <CartCount count={cartCount} /> и
// <AddButton onAdd={() => setCartCount(cartCount + 1)} />.



// TODO 2: Ошибка — дублирование state
// Дан (специально неправильный) вариант CartCount, который заводит СВОЙ
// собственный state вместо получения count пропом:
//
//   function CartCount() {
//     const [count, setCount] = useState(0)
//     return <p>В корзине: {count}</p>
//   }
//
// Объясните в комментарии: почему в этом случае CartCount никогда не
// покажет реальное количество, даже если AddButton работает и меняет
// state где-то ещё?

// Ответ: в этом варианте CartCount хранит собственный независимый state,
// никак не связанный с cartCount в App. AddButton меняет состояние
// родителя, но CartCount его не получает и продолжает показывать свой
// собственный счётчик.



// --- Средний уровень ---

// TODO 3: Третий компонент-сосед
// Добавьте ResetButton({ onReset }) — кнопка "Очистить корзину",
// вызывающая onReset. Подключите её в App: onReset={() => setCartCount(0)}.
// Теперь у вас три независимых компонента-соседа, синхронизированных
// через один state в App.



// TODO 4: Направление данных — вниз или вверх?
// Опишите в комментарии (2-3 предложения): в CartCount данные идут ВНИЗ
// (значение) или ВВЕРХ? А в AddButton — что именно передаётся вниз, и
// что физически происходит, когда AddButton вызывает onAdd?

// Ответ: в CartCount значение count идёт вниз, от App к дочернему
// компоненту. В AddButton вниз передаётся функция onAdd; когда кнопка
// вызывает её, обновляется state в App, после чего App перерисовывается
// и передаёт новое значение count в CartCount.



// --- Сложный уровень ---

// TODO 5: Два независимых state, поднятых в одного родителя
// Добавьте в App ещё const [isFavorite, setIsFavorite] = useState(false)
// и компонент FavoriteButton({ isFavorite, onToggle }), показывающий
// "В избранном" / "Не в избранном" через {String(isFavorite)} и кнопку
// переключения. Подключите его тем же способом (value вниз, функция
// вниз), что и CartCount/AddButton.



// TODO 6: Мини-панель из всех компонентов
// Соберите CartCount, AddButton, ResetButton и FavoriteButton вместе в
// один блок внутри App — так, чтобы все четыре компонента продолжали
// корректно работать через два лежащих в App state (cartCount и
// isFavorite), ничего не храня внутри себя.

import { useState } from 'react'

function CartCount({ count }) {
  return <p>В корзине: {count}</p>
}

function AddButton({ onAdd }) {
  return <button onClick={onAdd}>Добавить Корм для кошек</button>
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Очистить корзину</button>
}

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <div>
      <p>В избранном: {String(isFavorite)}</p>
      <button onClick={onToggle}>
        {isFavorite ? "Убрать из избранного" : "В избранное"}
      </button>
    </div>
  )
}

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div>
      <CartCount count={cartCount} />
      <AddButton onAdd={() => setCartCount(cartCount + 1)} />
      <ResetButton onReset={() => setCartCount(0)} />
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => setIsFavorite(!isFavorite)}
      />
    </div>
  )
}

// --- Задача уровня собеседования ---

// TODO 7: Почему соседи не могут напрямую общаться
// Опишите в комментарии (2-3 предложения): почему AddButton не может
// напрямую передать данные в CartCount, минуя App, даже если оба
// компонента объявлены в одном файле рядом друг с другом?

// Подсказка: props всегда идут только от родителя к прямому потомку —
// соседние компоненты друг о друге ничего не знают.

// Ответ: props передаются только от родителя к прямому потомку, а
// компоненты-соседи не имеют ссылок друг на друга и не знают о
// существовании друг друга. Поэтому общее состояние хранится в их общем
// родителе App, который передаёт значение в CartCount и функцию изменения
// в AddButton.

export default App

// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №1: DOM и выбор элементов — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server, консоль — в DevTools (F12).

// --- Лёгкий уровень ---

// TODO 1: getElementById
// Получите элемент с id="main-title" через document.getElementById
// и выведите его в консоль (console.log)

// Подсказка: document.getElementById("имя-id") — id передаётся БЕЗ решётки #
// (в отличие от querySelector, где решётка обязательна).

console.log(document.getElementById("main-title"));



// TODO 2: querySelector по классу
// Получите ПЕРВЫЙ элемент с классом "card" через document.querySelector(".card")
// и выведите его в консоль

// Подсказка: querySelector принимает обычный CSS-селектор строкой — точку
// перед именем класса указывать НУЖНО (в отличие от getElementById).

console.log(document.querySelector(".card"));



// --- Средний уровень ---

// TODO 3: querySelectorAll
// Получите ВСЕ элементы с классом "card" через document.querySelectorAll(".card")
// Выведите в консоль их количество (свойство .length)

// Подсказка: querySelectorAll возвращает СПИСОК элементов (даже если он один
// или пустой). У списка есть свойство .length — без скобок, это не метод.

console.log(document.querySelectorAll(".card").length);



// TODO 4: Перебор списка + вложенный поиск
// Переберите результат TODO 3 через forEach. Для каждой card найдите ВНУТРИ
// НЕЁ (не document, а саму card!) элемент с классом "card-title" через
// card.querySelector(".card-title") и выведите его textContent в консоль

// Подсказка: слова "переберите" и "для каждой" = нужны querySelectorAll + forEach
// ВМЕСТЕ (одно без другого не сработает). "ВНУТРИ НЕЁ (не document)" =
// искать нужно через card.querySelector(...), а не document.querySelector(...) —
// иначе всегда найдёте заголовок ПЕРВОЙ карточки, а не текущей.
// Структура: document.querySelectorAll(".card").forEach(function(card) { ... });

document.querySelectorAll(".card").forEach(function (card) {
  console.log(card.querySelector(".card-title").textContent);
});



// --- Сложный уровень ---

// TODO 5: Проверка на null
// Получите кнопку "#buy-btn" через querySelector — выведите в консоль.
// Затем попробуйте получить несуществующий элемент "#not-exist" — выведите
// результат в консоль. Оберните использование этого несуществующего элемента
// в проверку if (el) { ... }, чтобы показать, как правильно защищаться от null
// (если использовать el.textContent без проверки — код упадёт с ошибкой)

// Подсказка: querySelector возвращает null, если элемент не найден — это НЕ
// ошибка, а специальное "пустое" значение. null считается "ложным" (falsy),
// поэтому if (el) { ... } просто не выполнится, когда el === null.

var buyBtn = document.querySelector("#buy-btn");
console.log(buyBtn);

var missingEl = document.querySelector("#not-exist");
console.log(missingEl);

if (missingEl) {
  console.log(missingEl.textContent);
}



// TODO 6: querySelectorAll по ссылкам меню
// Получите все ссылки навигации через querySelectorAll(".menu-link").
// Выведите в консоль их количество и текст (textContent) каждой ссылки

// Подсказка: тот же паттерн, что и в TODO 4 — сначала querySelectorAll
// (получаем список), затем forEach (перебираем), внутри — .textContent
// у текущего элемента цикла.

var menuLinks = document.querySelectorAll(".menu-link");
console.log(menuLinks.length);

menuLinks.forEach(function (link) {
  console.log(link.textContent);
});



// --- Задача уровня собеседования ---

// TODO 7: NodeList vs HTMLCollection
// document.querySelectorAll() возвращает NodeList,
// а document.getElementsByClassName() возвращает HTMLCollection.
// Опишите в комментарии (2-3 предложения): чем они отличаются с точки
// зрения "живости" — какая коллекция автоматически обновляется, если
// после её получения добавить/удалить элемент на странице, а какая
// остаётся "снимком" на момент вызова?

// Подсказка: представьте, что сразу после document.querySelectorAll(".card")
// вы добавили на страницу ещё один <div class="card">. Попадёт ли он в уже
// полученный список? А если бы список получался через
// document.getElementsByClassName("card")?

// Ответ: document.querySelectorAll() возвращает статический NodeList — это
// «снимок» DOM на момент вызова, поэтому элемент, добавленный позже, в уже
// полученный список не попадёт. document.getElementsByClassName() возвращает
// «живую» HTMLCollection — она автоматически обновляется при любом изменении
// страницы, и новый .card сразу появится в этой коллекции.



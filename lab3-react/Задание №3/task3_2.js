// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №3: стили через JS — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: element.style
// Получите #js-box и через style.backgroundColor задайте ему фон "orange"

// Подсказка: element.style.свойство = "значение" — имя свойства пишется
// camelCase (backgroundColor), а не через дефис, как в CSS-файле
// (background-color).



// TODO 2: element.style + единицы измерения
// Задайте #js-box ширину 150px и высоту 80px через style.width / style.height
// (не забудьте "px" в строке!)

// Подсказка: box.style.width = 150 (число без единиц) просто не сработает —
// нужна строка с единицей измерения: box.style.width = "150px".



// --- Средний уровень ---

// TODO 3: несколько свойств сразу
// Задайте #js-box borderRadius "10px" и border "2px solid black"

// Подсказка: просто две отдельные строки кода, каждая — своё свойство style,
// как в TODO 1 и 2, друг за другом.



// TODO 4: element.style на элементе со стилями из CSS-класса
// Получите #preset-box (у него стиль задан через class="preset" в CSS).
// Выведите в консоль preset-box.style.backgroundColor — что вывелось и почему?

// Подсказка: element.style показывает ТОЛЬКО инлайн-стили (заданные прямо
// через JS или атрибут style="..."). Стили из CSS-класса через него не видны —
// поэтому результат может вас удивить.



// --- Сложный уровень ---

// TODO 5: getComputedStyle
// Через getComputedStyle(document.querySelector("#preset-box")) получите
// РЕАЛЬНЫЙ применённый backgroundColor и выведите в консоль. Сравните с TODO 4

// Подсказка: getComputedStyle(element) — это обычная функция (не метод
// самого элемента!), вызывается отдельно: getComputedStyle(el), а не
// el.getComputedStyle().



// TODO 6: getComputedStyle — ширина
// Тем же способом получите и выведите реальную ширину (width) #preset-box

// Подсказка: getComputedStyle(element) возвращает объект со ВСЕМИ реальными
// применёнными стилями, независимо от того, инлайн они, из класса или из
// стилей браузера по умолчанию.



// --- Задача уровня собеседования ---

// TODO 7: element.style vs getComputedStyle
// Опишите в комментарии (2-3 предложения): почему в TODO 4
// element.style.backgroundColor вывел пустую строку, а в TODO 5
// getComputedStyle вывел реальный цвет? В чём принципиальная разница между
// этими двумя способами?



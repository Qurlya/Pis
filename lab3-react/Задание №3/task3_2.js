// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №3: стили через JS — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: element.style
// Получите #js-box и через style.backgroundColor задайте ему фон "orange"

// Подсказка: element.style.свойство = "значение" — имя свойства пишется
// camelCase (backgroundColor), а не через дефис, как в CSS-файле
// (background-color).

var jsBox = document.querySelector("#js-box");
jsBox.style.backgroundColor = "orange";



// TODO 2: element.style + единицы измерения
// Задайте #js-box ширину 150px и высоту 80px через style.width / style.height
// (не забудьте "px" в строке!)

// Подсказка: box.style.width = 150 (число без единиц) просто не сработает —
// нужна строка с единицей измерения: box.style.width = "150px".

jsBox.style.width = "150px";
jsBox.style.height = "80px";



// --- Средний уровень ---

// TODO 3: несколько свойств сразу
// Задайте #js-box borderRadius "10px" и border "2px solid black"

// Подсказка: просто две отдельные строки кода, каждая — своё свойство style,
// как в TODO 1 и 2, друг за другом.

jsBox.style.borderRadius = "10px";
jsBox.style.border = "2px solid black";



// TODO 4: element.style на элементе со стилями из CSS-класса
// Получите #preset-box (у него стиль задан через class="preset" в CSS).
// Выведите в консоль preset-box.style.backgroundColor — что вывелось и почему?

// Подсказка: element.style показывает ТОЛЬКО инлайн-стили (заданные прямо
// через JS или атрибут style="..."). Стили из CSS-класса через него не видны —
// поэтому результат может вас удивить.

console.log(document.querySelector("#preset-box").style.backgroundColor);



// --- Сложный уровень ---

// TODO 5: getComputedStyle
// Через getComputedStyle(document.querySelector("#preset-box")) получите
// РЕАЛЬНЫЙ применённый backgroundColor и выведите в консоль. Сравните с TODO 4

// Подсказка: getComputedStyle(element) — это обычная функция (не метод
// самого элемента!), вызывается отдельно: getComputedStyle(el), а не
// el.getComputedStyle().

console.log(getComputedStyle(document.querySelector("#preset-box")).backgroundColor);



// TODO 6: getComputedStyle — ширина
// Тем же способом получите и выведите реальную ширину (width) #preset-box

// Подсказка: getComputedStyle(element) возвращает объект со ВСЕМИ реальными
// применёнными стилями, независимо от того, инлайн они, из класса или из
// стилей браузера по умолчанию.

console.log(getComputedStyle(document.querySelector("#preset-box")).width);



// --- Задача уровня собеседования ---

// TODO 7: element.style vs getComputedStyle
// Опишите в комментарии (2-3 предложения): почему в TODO 4
// element.style.backgroundColor вывел пустую строку, а в TODO 5
// getComputedStyle вывел реальный цвет? В чём принципиальная разница между
// этими двумя способами?

// Ответ: element.style читает ТОЛЬКО инлайн-стили элемента (атрибут style
// или заданные через JS), а цвет, пришедший из CSS-класса, там пустой —
// отсюда и пустая строка в TODO 4. getComputedStyle возвращает итоговые
// вычисленные стили после применения всех источников: инлайн, CSS-классов,
// стилей родителей и значений по умолчанию.



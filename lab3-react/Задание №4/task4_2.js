// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №4: события (addEventListener) — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: клик меняет свой же текст
// Получите #like-btn. Через addEventListener("click", ...) при клике
// меняйте его textContent на "❤️ Нравится"

// Подсказка: addEventListener("click", function() {...}) — функция внутри
// НЕ вызывается сразу, браузер сам вызовет её при каждом клике.

var likeBtn = document.querySelector("#like-btn");

likeBtn.addEventListener("click", function () {
  likeBtn.textContent = "❤️ Нравится";
});



// TODO 2: второй обработчик на ТОТ ЖЕ элемент
// На тот же #like-btn повесьте ЕЩЁ ОДИН addEventListener("click", ...)
// (да, можно несколько на одном элементе — оба сработают на каждый клик).
// В нём увеличивайте число в #counter на 1 при каждом клике
// (Number(counterEl.textContent) + 1, затем запишите обратно через textContent)

// Подсказка: addEventListener можно вызвать на одном элементе НЕСКОЛЬКО раз —
// каждый обработчик сработает независимо, в отличие от btn.onclick, где новый
// обработчик заменил бы предыдущий.

var counterEl = document.querySelector("#counter");

likeBtn.addEventListener("click", function () {
  counterEl.textContent = Number(counterEl.textContent) + 1;
});



// --- Средний уровень ---

// TODO 3: submit формы + preventDefault
// Получите #demo-form. Подпишитесь на "submit", внутри вызовите
// event.preventDefault(), затем возьмите значение поля #name-input
// (свойство .value, не textContent!) и выведите его в #form-result через textContent

// Подсказка: event.preventDefault() вызывается как метод именно у объекта
// event — того самого, что браузер передаёт первым параметром в функцию-
// обработчик: function(event) { event.preventDefault(); ... }

var demoForm = document.querySelector("#demo-form");

demoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector("#form-result").textContent =
    document.querySelector("#name-input").value;
});



// TODO 4: событие "input" — живой предпросмотр
// Получите #name-input. Подпишитесь на "input" (срабатывает на каждый ввод
// символа). Внутри записывайте текущее значение поля (.value) в
// #live-preview через textContent

// Подсказка: событие "input" вешается на САМО ПОЛЕ (не на форму!) и
// срабатывает при КАЖДОМ изменении текста — не путайте с "submit" из TODO 3,
// который висит на форме и срабатывает один раз при отправке.

var nameInput = document.querySelector("#name-input");

nameInput.addEventListener("input", function () {
  document.querySelector("#live-preview").textContent = nameInput.value;
});



// --- Сложный уровень ---

// TODO 5: один обработчик на список — event.target
// Получите #color-list (сам <ul>, не отдельные <li>!). Повесьте ОДИН
// addEventListener на "click". Внутри через event.target получите элемент,
// на котором кликнули, прочитайте его атрибут "data-color" через
// getAttribute, и запишите в #clicked-color

// Подсказка: клик по <li> всплывает и до <ul> тоже — событие "click" на <ul>
// сработает, а event.target внутри обработчика укажет именно на <li>, по
// которому кликнули, а не на сам <ul>.

document.querySelector("#color-list").addEventListener("click", function (event) {
  document.querySelector("#clicked-color").textContent =
    event.target.getAttribute("data-color");
});



// TODO 6: keydown на всём документе
// Подпишитесь на "keydown" на document (а не на конкретном элементе).
// В обработчике выведите в консоль event.key — какая клавиша была нажата

// Подсказка: document — уже готовый глобальный объект (вся страница целиком),
// его не нужно "искать" через querySelector, в отличие от обычных элементов.

document.addEventListener("keydown", function (event) {
  console.log(event.key);
});



// --- Задача уровня собеседования ---

// TODO 7: ссылка на функцию vs вызов функции
// Опишите в комментарии (2-3 предложения): почему
// btn.addEventListener("click", doSomething()) — ошибка (сработает сразу,
// один раз, при загрузке страницы), а
// btn.addEventListener("click", doSomething) — правильно (сработает при клике)?
// В чём разница между этими двумя записями?

// Ответ: doSomething() — это ВЫЗОВ функции, её результат (обычно undefined)
// передаётся в addEventListener как обработчик, а сама функция выполняется
// один раз прямо в момент загрузки страницы. doSomething без скобок — это
// ссылка на функцию, браузер сохранит её и будет вызывать при каждом клике.



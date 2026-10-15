// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №2: изменение содержимого и атрибутов — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: textContent
// Получите элемент #username и через textContent замените текст на
// название Зоомагазин «Лапки»

// Подсказка: textContent — это свойство (не метод, без скобок), просто
// присвойте ему новую строку: element.textContent = "текст";

document.querySelector("#username").textContent = "Зоомагазин «Лапки»";



// TODO 2: textContent
// Получите элемент #bio и через textContent замените текст на любое
// описание, связанное с темой Зоомагазин «Лапки»

// Подсказка: тот же приём, что и в TODO 1 — просто другой элемент и текст.

document.querySelector("#bio").textContent =
  "Всё для ухода за питомцами: корма, игрушки и аксессуары.";



// --- Средний уровень ---

// TODO 3: innerHTML
// Получите элемент #notice и через innerHTML вставьте строку с HTML-тегом,
// например "<strong>Внимание!</strong> Информация обновлена."
// (тег <strong> должен реально отрисоваться жирным на странице)

// Подсказка: innerHTML тоже присваивается строкой (element.innerHTML = "..."),
// но, в отличие от textContent, теги внутри строки реально отрисуются как
// разметка, а не как обычный видимый текст.

document.querySelector("#notice").innerHTML =
  "<strong>Внимание!</strong> Информация обновлена.";



// TODO 4: setAttribute / getAttribute
// Получите элемент #avatar. Выведите в консоль его текущий "alt" через
// getAttribute. Затем через setAttribute поменяйте "src" на любую другую
// строку (например "photo2.jpg") и "alt" на новое описание

// Подсказка: getAttribute("имя") — читает (со скобками, имя атрибута строкой).
// setAttribute("имя", "значение") — записывает (два аргумента строками).
// Оба работают с ЛЮБЫМ атрибутом, не только с src/alt.

var avatar = document.querySelector("#avatar");
console.log(avatar.getAttribute("alt"));
avatar.setAttribute("src", "photo2.jpg");
avatar.setAttribute("alt", "Фото товара из зоомагазина «Лапки»");



// --- Сложный уровень ---

// TODO 5: classList.add/remove
// Получите #status-badge. Уберите класс "badge-offline" и добавьте
// "badge-online" (используйте classList.remove и classList.add — ДВА
// действия, не toggle, т.к. классы разные, не один и тот же вкл/выкл)

// Подсказка: classList.remove("класс") и classList.add("класс") — оба
// принимают имя класса строкой, БЕЗ точки перед именем.

var statusBadge = document.querySelector("#status-badge");
statusBadge.classList.remove("badge-offline");
statusBadge.classList.add("badge-online");



// TODO 6: classList.contains
// Получите #status-badge ещё раз. Проверьте через if и classList.contains,
// есть ли у него класс "badge-online" — выведите в консоль true или false

// Подсказка: classList.contains("имя-класса") возвращает true/false —
// удобно использовать прямо внутри if (el.classList.contains("...")) { ... }

var badgeAgain = document.querySelector("#status-badge");
if (badgeAgain.classList.contains("badge-online")) {
  console.log(true);
} else {
  console.log(false);
}



// --- Задача уровня собеседования ---

// TODO 7: textContent vs innerHTML
// Опишите в комментарии (2-3 предложения): в чём разница между textContent
// и innerHTML, и почему для вывода текста от пользователя (например,
// комментария) обычно безопаснее использовать textContent, а не innerHTML?

// Подсказка: подумайте, что произойдёт, если пользователь введёт в
// комментарий текст с символами < и >, например <script>...</script> — как
// его обработает innerHTML, а как textContent?

// Ответ: textContent записывает и читает только текст, все символы вроде < и >
// остаются обычными видимыми знаками, а innerHTML разбирает их как HTML-теги.
// Если выводить через innerHTML введённый пользователем текст, то тег
// <script>...</script> попадёт в разметку и выполнится — это XSS-уязвимость.
// Поэтому для текста от пользователя безопаснее textContent: он ничего не
// исполняет и всегда показывает строку как есть.



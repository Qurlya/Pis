// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №7: работа с формами — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

const form = document.querySelector("#reg-form");

// --- Лёгкий уровень ---

// TODO 1: текстовое поле
// Получите #username-field. Подпишитесь на "submit" формы (не забудьте
// event.preventDefault()), внутри выведите в консоль username.value

// Подсказка: событие "submit" вешается на САМУ ФОРМУ (form, которая уже
// получена в переменную form выше), а не на поле ввода — у полей ввода
// такого события нет, оно не сработает.

const usernameField = document.querySelector("#username-field");
const agreeCheckbox = document.querySelector("#agree-checkbox");
const countrySelect = document.querySelector("#country-select");
const errorBox = document.querySelector("#error-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (usernameField.value === "") {
    errorBox.textContent = "Введите имя";
    return;
  }

  if (!agreeCheckbox.checked) {
    errorBox.textContent = "Нужно согласиться с условиями";
    return;
  }

  errorBox.textContent = "";

  console.log(usernameField.value);
  console.log(agreeCheckbox.checked);
  console.log(document.querySelector('input[name="account-type"]:checked').value);
  console.log(countrySelect.value);
});



// TODO 2: чекбокс — .checked, а не .value!
// В ТОМ ЖЕ обработчике получите #agree-checkbox и выведите в консоль его .checked

// Подсказка: checkbox.value почти всегда просто "on" — бесполезно. Нужно
// именно .checked (true/false)
// (console.log(agreeCheckbox.checked) — в общем обработчике выше, в TODO 1)



// --- Средний уровень ---

// TODO 3: радиокнопки — :checked
// В ТОМ ЖЕ обработчике получите выбранную радиокнопку через
// document.querySelector('input[name="account-type"]:checked')
// и выведите в консоль её .value

// Подсказка: 'input[name="account-type"]:checked' — это ОДИН CSS-селектор:
// сначала фильтр по атрибуту name, затем псевдокласс :checked (только
// отмеченный элемент). querySelector найдёт ровно ту радиокнопку, что выбрана.
// (console.log радиокнопки — в общем обработчике выше, в TODO 1)



// TODO 4: select
// В ТОМ ЖЕ обработчике получите #country-select и выведите в консоль его .value

// Подсказка: у select всё так же просто, как у текстового поля — обычное
// .value, никаких новых приёмов не нужно.
// (console.log(countrySelect.value) — в общем обработчике выше, в TODO 1)



// --- Сложный уровень ---

// TODO 5: валидация — обязательное поле
// В САМОМ НАЧАЛЕ обработчика (сразу после preventDefault) проверьте: если
// #username-field.value === "" — запишите в #error-message textContent
// "Введите имя" и сделайте return (дальше код выполняться не должен)

// Подсказка: тот же принцип, что и с null-проверками в теме 1 — если условие
// (пустая строка) верно, выполняем действие и сразу return, чтобы код ниже
// не выполнился на невалидных данных.
// (проверка стоит сразу после preventDefault в общем обработчике выше — в TODO 1)



// TODO 6: валидация — согласие с условиями
// После проверки из TODO 5 (если поле не пустое) добавьте вторую проверку:
// если #agree-checkbox НЕ отмечен — запишите в #error-message
// "Нужно согласиться с условиями" и return. Если обе проверки прошли —
// очистите #error-message (errorBox.textContent = "")

// Подсказка: проверки идут одна за другой — сначала имя, потом чекбокс.
// Если первая проверка сработала (return) — до второй дело не дойдёт.
// (вторая проверка и очистка errorBox.textContent = "" — там же, в TODO 1)



// --- Задача уровня собеседования ---

// TODO 7: почему не .value у чекбокса
// Опишите в комментарии (2-3 предложения): почему для чекбокса используют
// .checked, а не .value, хотя у текстового поля именно .value? Что вообще
// хранится в .value у чекбокса, и почему оно бесполезно для проверки
// "отмечен/не отмечен"?

// Ответ: у чекбокса .value — это всего лишь строка, переданная в атрибуте
// value (по умолчанию "on"), и она одинаковая и отмеченного, и невыбранного
// чекбокса. Свойство .checked хранит именно состояние — true/false, в зависимости
// от того, стоит ли галочка, поэтому проверять нужно его.



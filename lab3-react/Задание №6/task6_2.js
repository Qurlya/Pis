// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №6: создание и удаление элементов — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: createElement без вставки
// Получите #sandbox. Через document.createElement("p") создайте новый <p>,
// задайте ему textContent "Привет!" и выведите его в консоль.
// НЕ вставляйте его никуда. Посмотрите на страницу — элемент появился?
// Почему?

// Подсказка: document.createElement("тег") создаёт элемент только в памяти
// JS — на странице его не видно, пока не вставите через appendChild/prepend.

var sandbox = document.querySelector("#sandbox");
var greeting = document.createElement("p");
greeting.textContent = "Привет!";
console.log(greeting);



// TODO 2: appendChild
// Тот же созданный элемент (или новый) добавьте в #sandbox через appendChild.
// Теперь посмотрите на страницу — должен появиться реально

// Подсказка: parent.appendChild(el) добавляет el ПОСЛЕДНИМ ребёнком внутрь
// parent — только после этого элемент реально появляется на странице.

sandbox.appendChild(greeting);



// --- Средний уровень ---

// TODO 3: полный рецепт по кнопке
// Получите #add-task-btn и #new-task-input. Повесьте на кнопку "click":
// внутри создайте <li>, задайте textContent = значение поля (.value),
// и добавьте его в #todo-list через appendChild

// Подсказка: рецепт из 3 шагов — создать (createElement) → настроить
// (textContent/атрибуты) → вставить (appendChild). Все три шага обязательны.



// TODO 4: очистка поля после добавления
// В ТОМ ЖЕ обработчике из TODO 3 — после appendChild очистите поле ввода
// (input.value = ""), чтобы можно было сразу вводить следующую запись

// Подсказка: если поле пустое (пользователь ничего не ввёл), не стоит
// добавлять пустой <li> — можно обернуть весь код в if (input.value !== "")

var addTaskBtn = document.querySelector("#add-task-btn");
var addTaskTopBtn = document.querySelector("#add-task-top-btn");
var newTaskInput = document.querySelector("#new-task-input");
var todoList = document.querySelector("#todo-list");

addTaskBtn.addEventListener("click", function () {
  if (newTaskInput.value === "") {
    return;
  }

  var li = document.createElement("li");
  li.textContent = newTaskInput.value;

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
  newTaskInput.value = "";
});



// --- Сложный уровень ---

// TODO 5: prepend — добавление в начало
// Получите #add-task-top-btn. Повесьте "click": по такому же рецепту
// создайте <li> с текстом из #new-task-input, но добавьте его через prepend
// (не appendChild) — новая запись должна оказаться ПЕРВОЙ в списке

// Подсказка: prepend работает так же, как appendChild, но вставляет элемент
// ПЕРВЫМ ребёнком, а не последним — остальной код можно скопировать из TODO 3.

addTaskTopBtn.addEventListener("click", function () {
  if (newTaskInput.value === "") {
    return;
  }

  var li = document.createElement("li");
  li.textContent = newTaskInput.value;

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });
  li.appendChild(deleteBtn);

  todoList.prepend(li);
  newTaskInput.value = "";
});



// TODO 6: удаление созданного элемента напрямую (без делегирования)
// Доработайте TODO 3 (или TODO 5): вместе с <li> создайте ещё и <button> с
// текстом "✕" и классом "delete-btn", добавьте его ВНУТРЬ <li>
// (li.appendChild(deleteBtn) ПЕРЕД тем как li добавляется в список). У ЭТОЙ
// кнопки сразу же, пока у вас есть прямая ссылка на неё, повесьте свой
// click-обработчик, который вызывает li.remove()

// Подсказка: тут делегирование не нужно — вы только что сами создали и
// кнопку, и li, ссылки на оба элемента уже есть в переменных.
// (кнопка "✕" создаётся и получает свой обработчик li.remove() внутри
// обработчиков кнопок добавления выше — в TODO 3 и TODO 5)



// --- Задача уровня собеседования ---

// TODO 7: прямой обработчик vs делегирование
// Опишите в комментарии (2-3 предложения): почему для СВЕЖЕСОЗДАННОГО
// элемента (как в TODO 6) логично повесить обработчик прямо на него, а
// делегирование (тема 5, один обработчик на родителя) больше подходит для
// элементов, которые уже есть на странице в большом количестве или
// добавляются откуда-то ещё?

// Ответ: для свежесозданного элемента у нас уже есть прямые ссылки на него и
// на кнопку, поэтому повесить обработчик прямо сейчас проще всего — новых
// элементов-братьев этот обработчик не затронет. Делегирование же экономит
// память и время на большом списке: один обработчик на родителя обслуживает и
// уже существующие, и появляющиеся позже элементы, пока их много.



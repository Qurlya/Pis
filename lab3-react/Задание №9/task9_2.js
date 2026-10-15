// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №9: Fetch API — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.
// Используем бесплатный тестовый API: https://jsonplaceholder.typicode.com
// (специально сделан для учебных запросов, не требует ключей/регистрации)

// --- Лёгкий уровень ---

// TODO 1: fetch + .then + .catch — список пользователей
// Получите #load-users-btn. По клику сделайте:
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log("Ошибка:", error));

// Подсказка: response.json() тоже возвращает Promise — поэтому и нужны ДВА
// .then() подряд: первый разбирает "конверт" (response), второй получает
// уже готовые данные.

document.querySelector("#load-users-btn").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector("#users-result").textContent =
        "Пользователей: " + data.length;
    })
    .catch(error => console.log("Ошибка:", error));
});



// TODO 2: покажите количество на странице
// В том же .then(data => ...) из TODO 1 запишите в #users-result
// текст вида "Пользователей: " + data.length (через textContent)
// (запись в #users-result добавлена в тот же .then(data => ...) выше — в TODO 1)



// --- Средний уровень ---

// TODO 3: async/await — один пользователь
// Напишите async-функцию loadSingleUser(), которая:
// 1) await fetch("https://jsonplaceholder.typicode.com/users/1")
// 2) await response.json()
// 3) записывает data.name в #single-result через textContent
// Всё оберните в try/catch (catch пока просто console.log(error))

// Подсказка: слово async ставится перед function, await — перед fetch(...)
// и перед response.json(). Без async перед функцией await использовать нельзя.

async function loadSingleUser() {
  try {
    var response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    var data = await response.json();
    document.querySelector("#single-result").textContent = data.name;
  } catch (error) {
    console.log(error);
  }
}



// TODO 4: подключите функцию к кнопке
// Получите #load-single-btn и повесьте на неё "click", который вызывает
// loadSingleUser() из TODO 3

document.querySelector("#load-single-btn").addEventListener("click", function () {
  loadSingleUser();
});



// --- Сложный уровень ---

// TODO 5: обработка HTTP-ошибки (404)
// Напишите async-функцию loadBadUser(), которая делает
// await fetch("https://jsonplaceholder.typicode.com/users/9999") (несуществующий id).
// После получения response проверьте: if (!response.ok) — сделайте
// throw new Error("Пользователь не найден: " + response.status)
// В catch — запишите текст ошибки (error.message) в #error-result

// Подсказка: fetch НЕ переходит в catch сам по себе на 404 — сервер всё
// равно "ответил", просто с кодом ошибки. response.ok — это то единственное,
// что скажет вам, был ли ответ реально успешным (200-299) или нет.

async function loadBadUser() {
  try {
    var response = await fetch(
      "https://jsonplaceholder.typicode.com/users/9999"
    );

    if (!response.ok) {
      throw new Error("Пользователь не найден: " + response.status);
    }
  } catch (error) {
    document.querySelector("#error-result").textContent = error.message;
  }
}



// TODO 6: подключите к кнопке
// Получите #load-bad-btn и повесьте на неё "click", который вызывает
// loadBadUser() из TODO 5

document.querySelector("#load-bad-btn").addEventListener("click", function () {
  loadBadUser();
});



// --- Задача уровня собеседования ---

// TODO 7: почему .catch() одного не хватает
// Опишите в комментарии (2-3 предложения): почему просто fetch(...).catch(...)
// не поймает ситуацию "пользователь не найден" (404)? Что вообще считается
// "ошибкой" с точки зрения fetch, а что — просто обычным (хоть и неудачным)
// ответом сервера?

// Ответ: для fetch "ошибкой" считается только сбой сети (нет интернета, DNS,
// обрыв соединения) — тогда промис отклоняется и срабатывает .catch(). Ответ
// 404 — это полноценный ответ сервера: fetch считает его успешным, потому что
// соединение состоялось, и остаётся самому проверять response.ok.



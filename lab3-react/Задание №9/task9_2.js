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



// TODO 2: покажите количество на странице
// В том же .then(data => ...) из TODO 1 запишите в #users-result
// текст вида "Пользователей: " + data.length (через textContent)



// --- Средний уровень ---

// TODO 3: async/await — один пользователь
// Напишите async-функцию loadSingleUser(), которая:
// 1) await fetch("https://jsonplaceholder.typicode.com/users/1")
// 2) await response.json()
// 3) записывает data.name в #single-result через textContent
// Всё оберните в try/catch (catch пока просто console.log(error))

// Подсказка: слово async ставится перед function, await — перед fetch(...)
// и перед response.json(). Без async перед функцией await использовать нельзя.



// TODO 4: подключите функцию к кнопке
// Получите #load-single-btn и повесьте на неё "click", который вызывает
// loadSingleUser() из TODO 3



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



// TODO 6: подключите к кнопке
// Получите #load-bad-btn и повесьте на неё "click", который вызывает
// loadBadUser() из TODO 5



// --- Задача уровня собеседования ---

// TODO 7: почему .catch() одного не хватает
// Опишите в комментарии (2-3 предложения): почему просто fetch(...).catch(...)
// не поймает ситуацию "пользователь не найден" (404)? Что вообще считается
// "ошибкой" с точки зрения fetch, а что — просто обычным (хоть и неудачным)
// ответом сервера?



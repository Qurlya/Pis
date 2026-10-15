// ЛАБОРАТОРНАЯ РАБОТА №3
// ЗАДАНИЕ №10: JSON (JSON.stringify / JSON.parse) — Вариант 03
// Тема: Зоомагазин «Лапки». Откройте var03.html через Live Server.

// --- Лёгкий уровень ---

// TODO 1: JSON.stringify — объект в строку
// Создайте обычный объект const person = { name: "Аня", age: 20 };
// Выведите в консоль сам объект (console.log(person)), а затем
// console.log(JSON.stringify(person)) — сравните, как они выглядят в консоли

// Подсказка: у JSON-строки ключи в кавычках ("name", а не name), и вся
// структура — это ОДНА строка текста, а не объект.

const person = { name: "Аня", age: 20 };
console.log(person);
console.log(JSON.stringify(person));



// TODO 2: JSON.parse — строка в объект
// Создайте строку const raw = '{"name":"Аня","age":20}';
// Через JSON.parse(raw) получите из неё реальный объект, выведите его в
// консоль и отдельно выведите parsed.name (докажите, что это теперь
// настоящий объект)

const raw = '{"name":"Аня","age":20}';
const parsed = JSON.parse(raw);
console.log(parsed);
console.log(parsed.name);



// --- Средний уровень ---

// TODO 3: сохранение в localStorage
// Получите #name-field, #age-field, #save-btn. По клику на кнопку:
// соберите объект { name: nameField.value, age: ageField.value },
// превратите его в строку через JSON.stringify и сохраните через
// localStorage.setItem("profile", ...)

// Подсказка: localStorage.setItem("ключ", "значение") — оба аргумента строки.
// Объект без JSON.stringify не сохранится корректно (см. TODO 5 — там как
// раз демонстрация этой ошибки).

const nameField = document.querySelector("#name-field");
const ageField = document.querySelector("#age-field");

document.querySelector("#save-btn").addEventListener("click", function () {
  const profile = { name: nameField.value, age: ageField.value };
  localStorage.setItem("profile", JSON.stringify(profile));
});



// TODO 4: загрузка из localStorage
// Получите #load-btn. По клику: localStorage.getItem("profile") достаёт
// строку, JSON.parse превращает её обратно в объект, запишите в #output
// что-то вроде "Имя: " + parsed.name + ", возраст: " + parsed.age

// Подсказка: если ничего не сохраняли — getItem вернёт null. Проверьте
// результат через if перед использованием (parsed.name), иначе можно
// получить ошибку при обращении к свойству null.

document.querySelector("#load-btn").addEventListener("click", function () {
  const storedProfile = localStorage.getItem("profile");

  if (storedProfile === null) {
    return;
  }

  const savedProfile = JSON.parse(storedProfile);
  document.querySelector("#output").textContent =
    "Имя: " + savedProfile.name + ", возраст: " + savedProfile.age;
});



// --- Сложный уровень ---

// TODO 5: демонстрация ошибки — сохранение БЕЗ stringify
// Получите #bad-save-btn. По клику сохраните объект НАПРЯМУЮ, без
// JSON.stringify: localStorage.setItem("bad", { foo: "bar" })
// (да, специально неправильно — это часть задания, чтобы увидеть результат)

document.querySelector("#bad-save-btn").addEventListener("click", function () {
  localStorage.setItem("bad", { foo: "bar" });
});



// TODO 6: попытка прочитать это же значение
// Получите #bad-load-btn. По клику получите localStorage.getItem("bad") и
// выведите в консоль — увидите строку "[object Object]", а не рабочие
// данные. Оберните JSON.parse этой строки в try/catch — в catch выведите в
// #bad-output текст "Не удалось разобрать JSON: испорченные данные"

// Подсказка: JSON.parse("[object Object]") выбросит SyntaxError, т.к. это
// не валидный JSON — вот почему try/catch тут обязателен, если данные могут
// быть повреждены.

document.querySelector("#bad-load-btn").addEventListener("click", function () {
  const badRaw = localStorage.getItem("bad");
  console.log(badRaw);

  try {
    JSON.parse(badRaw);
  } catch (error) {
    document.querySelector("#bad-output").textContent =
      "Не удалось разобрать JSON: испорченные данные";
  }
});



// --- Задача уровня собеседования ---

// TODO 7: почему localStorage нужен именно JSON
// Опишите в комментарии (2-3 предложения): почему localStorage вообще
// требует JSON.stringify/JSON.parse — что будет, если положить туда объект
// напрямую, и почему localStorage в принципе не может хранить "живые"
// JS-объекты?

// Ответ: localStorage — это хранилище строк, любой value там неявно приводится
// к строке, поэтому объект превращается в "[object Object]" и теряет все
// данные. JSON.stringify делает из объекта текст с сохранением структуры, а
// JSON.parse восстанавливает из него настоящий объект. "Живые" объекты с
// методами и ссылками хранить нельзя — в хранилище попадает только текст.



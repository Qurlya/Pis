// ЛАБОРАТОРНАЯ РАБОТА №1
// ЗАДАНИЕ №3: Объекты
// Вариант 03
//
// Выполняйте задания строго по порядку. Запуск файла: node var03.js
// (или кнопкой запуска расширения Code Runner в VS Code)

// --- Лёгкий уровень ---

// TODO 1: Создание объекта
// Создайте объект const product с полями brand, model, year,
// описывающий "смартфон" (значения полей — на ваш выбор)
const product = {
    brand: 'Apple',
    model: 'X',
    year: 2017,
}

// TODO 2: Доступ к полям объекта
// Выведите значение поля brand через точечную нотацию,
// и значение поля model через квадратные скобки
console.log(product.brand);
console.log(product["model"]);

// TODO 3: Вывод объекта целиком
// Выведите весь объект product целиком одним console.log
console.log(product)

// --- Средний уровень ---

// TODO 4: Изменение и добавление полей
// Измените значение year на любое другое, затем добавьте новое
// поле color. Выведите объект после изменений
product["year"] = 2016;
product["color"] = "black";
console.log(product);

// TODO 5: Проверка поля через in
// Проверьте через оператор in, есть ли в объекте поле "price"
// (сначала проверьте ДО добавления, затем добавьте поле price и
// проверьте ЕЩЁ РАЗ)
console.log("price" in product);
product["price"] = 22222;
console.log("price" in product);

// TODO 6: Удаление поля (delete)
// Удалите поле color через delete, выведите объект и убедитесь,
// что поля больше нет
delete product.color;
console.log(product);

// --- Сложный уровень ---

// TODO 7: Вложенные объекты
// Раскомментируйте вложенный объект ниже

const company = {
  name: "EcoLine",
  address: {
    city: "Волгоград",
    street: "Мира",
  },
  employees: 65,
};

// Выведите в консоль город (city) через цепочку точек company.address.city.
// Затем измените employees на 115 и выведите новое значение.
console.log(company.address.city);
company.employees = 444;
console.log(company.employees);

// --- Задача уровня собеседования ---

// TODO 8: Обращение к несуществующему полю
// Что выведет следующий код? Запишите прогноз в выводах результата в отчёте
// ДО запуска, затем раскомментируйте и проверьте.

const obj = { a: 1 };
console.log(obj.b);


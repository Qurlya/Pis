// ЛАБОРАТОРНАЯ РАБОТА №3
// ИТОГОВОЕ ЗАДАНИЕ — Вариант 03
// Стиль: «ТЦ» — ТЦ «Галерея»
//
// Это ПРОДОЛЖЕНИЕ вашего сайта «ТЦ «Галерея»» из Итогового задания Лабы №2.
// Готовой разметки тут больше нет — возьмите этот файл целиком и подключите
// в СВОЙ проект (<script src="итог-лаба3.js"></script> в конце body, ПОСЛЕ
// разметки). Работайте со своей собственной вёрсткой, дополняя её там, где
// сказано "нужно добавить" в пунктах ниже.
//
// НАПОМИНАНИЕ о структуре вашего сайта из Лабы №2 (она была одинаковой у
// всех — просто с вашим оформлением и вашими полями формы):
// <nav class="nav"> с несколькими <a> — меню сайта
// три <div class="feature-card"> — карточки услуг/преимуществ
// <div class="promo-card"> с <span class="badge"> внутри — промо-блок
// <section class="form-section"> с <form> — форма (4 текстовых поля + 2 radio-группы)
//
// Подсказок по коду здесь нет — это итоговая работа, опирайтесь на то, что
// делали в Заданиях №1-10.
//
// ТРЕБОВАНИЯ:
//
// 1. Навигация (делегирование). Один addEventListener("click", ...) на ваш
//    <nav class="nav"> (добавьте ему id, если хотите обращаться проще).
//    Клик по любой ссылке <a> внутри — добавляет ей класс "active" и убирает
//    этот класс у остальных ссылок. Стиль для .active впишите в свой CSS сами.
//
// 2. Карточки услуг (делегирование + классы). Один обработчик на общего
//    родителя ваших .feature-card. Клик по любой .feature-card — переключает
//    ей класс "selected" (classList.toggle). Стиль для .selected — тоже свой.
//
// 3. Избранное (создание и удаление элементов) — нужно добавить в разметку:
//    - в каждую .feature-card — кнопку, например
//      <button class="add-fav-btn">В избранное</button>
//    - где-нибудь на странице — пустой список и заглушку:
//      <ul id="favorites-list"></ul>
//      <p id="favorites-empty">Пока пусто</p>
//    По клику на .add-fav-btn (делегирование на родителя карточек) — через
//    createElement создайте новый <li> с названием карточки (текст её h3)
//    внутри #favorites-list, добавьте туда же кнопку удаления, у которой
//    сразу же (без делегирования — ссылка на неё уже есть) повесьте
//    обработчик, удаляющий именно этот <li>. Показывайте #favorites-empty,
//    только когда список пуст — проверяйте это после каждого добавления/
//    удаления.
//
// 4. Промо-таймер (setInterval) — нужно добавить в разметку: внутри вашего
//    .promo-card добавьте <span id="promo-timer">05:00</span>. Запустите
//    обратный отсчёт от 5 минут (300 секунд), обновляя текст каждую секунду
//    в формате MM:SS (например, "04:59"). Когда дойдёт до 0 — остановите
//    интервал (clearInterval) и измените текст вашего <span class="badge">
//    на "Акция завершена".
//
// 5. Валидация формы (события + формы). При отправке вашей формы —
//    event.preventDefault(). Проверьте, что все текстовые поля заполнены и
//    что в ОБЕИХ radio-группах выбран вариант. Если что-то не так — выведите
//    понятную ошибку рядом с формой (например, в новый
//    <div id="form-status"></div>, если такого элемента ещё нет) и
//    остановитесь (return). Если всё заполнено — покажите сообщение об
//    успешной отправке.
//
// 6. Сохранение данных формы (JSON + localStorage). После успешной отправки
//    сохраните значения текстовых полей формы в localStorage (одним
//    объектом через JSON.stringify). При обычной загрузке страницы — если в
//    localStorage уже есть сохранённые данные, подставьте их обратно в поля
//    формы (JSON.parse), чтобы не вводить всё заново.
//
// 7. Отзыв с сервера (Fetch API) — нужно добавить в разметку: где-нибудь на
//    странице —
//    <div id="review-content">Нажмите кнопку, чтобы загрузить отзыв</div>
//    <button id="load-review-btn">Показать отзыв</button>
//    По клику — через fetch (async/await или .then, на ваш выбор) загрузите
//    ОДИН комментарий с
//    https://jsonplaceholder.typicode.com/comments?_limit=1
//    и выведите его текст (свойство body) и автора (свойство email) в
//    #review-content. Не забудьте обработку ошибок сети (try/catch или .catch).
//
// 8. (Необязательно, для повышенной оценки) Добавьте 1-2 своих улучшения,
//    используя пройденный материал — например, живые часы где-нибудь на
//    странице, дополнительную проверку в форме, анимацию через classList
//    и т.д.

// ============================================================================
// РЕАЛИЗАЦИЯ
// ============================================================================

// --- 1. Навигация (делегирование) ---

var siteNav = document.querySelector("#site-nav");

siteNav.addEventListener("click", function (event) {
  var link = event.target.closest("a");

  if (link === null) {
    return;
  }

  var navLinks = siteNav.querySelectorAll("a");
  navLinks.forEach(function (item) {
    item.classList.remove("active");
  });

  link.classList.add("active");
});



// --- 2. Карточки услуг (делегирование + классы) ---
// --- 3. Избранное (создание и удаление элементов) ---

var featuresContainer = document.querySelector(".features");
var favoritesList = document.querySelector("#favorites-list");
var favoritesEmpty = document.querySelector("#favorites-empty");

function updateFavoritesEmpty() {
  if (favoritesList.children.length === 0) {
    favoritesEmpty.classList.remove("hidden");
  } else {
    favoritesEmpty.classList.add("hidden");
  }
}

updateFavoritesEmpty();

featuresContainer.addEventListener("click", function (event) {
  var addFavBtn = event.target.closest(".add-fav-btn");

  if (addFavBtn !== null) {
    var card = addFavBtn.closest(".feature-card");
    var cardTitle = card.querySelector("h3").textContent;

    var alreadyAdded = false;
    Array.prototype.forEach.call(favoritesList.children, function (item) {
      if (item.dataset.title === cardTitle) {
        alreadyAdded = true;
      }
    });

    if (alreadyAdded) {
      return;
    }

    var favoriteItem = document.createElement("li");
    favoriteItem.textContent = cardTitle;
    favoriteItem.dataset.title = cardTitle;
    favoriteItem.classList.add("fav-in");

    var removeFavBtn = document.createElement("button");
    removeFavBtn.type = "button";
    removeFavBtn.textContent = "✕";
    removeFavBtn.classList.add("remove-fav-btn");

    removeFavBtn.addEventListener("click", function () {
      favoriteItem.remove();
      updateFavoritesEmpty();
    });

    favoriteItem.appendChild(removeFavBtn);
    favoritesList.appendChild(favoriteItem);
    updateFavoritesEmpty();

    return;
  }

  var clickedCard = event.target.closest(".feature-card");

  if (clickedCard !== null) {
    clickedCard.classList.toggle("selected");
  }
});



// --- 4. Промо-таймер (setInterval) ---

var promoTimer = document.querySelector("#promo-timer");
var promoBadge = document.querySelector(".badge");
var promoSecondsLeft = 300;

var promoIntervalId = setInterval(function () {
  promoSecondsLeft = promoSecondsLeft - 1;

  var minutes = Math.floor(promoSecondsLeft / 60);
  var seconds = promoSecondsLeft % 60;

  promoTimer.textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  if (promoSecondsLeft <= 0) {
    clearInterval(promoIntervalId);
    promoBadge.textContent = "Акция завершена";
  }
}, 1000);



// --- 5. Валидация формы (события + формы) ---
// --- 6. Сохранение данных формы (JSON + localStorage) ---

var leadForm = document.querySelector(".form-section form");
var formStatus = document.querySelector("#form-status");
var fnameField = document.querySelector("#fname");
var femailField = document.querySelector("#femail");
var fpassField = document.querySelector("#fpass");
var fphoneField = document.querySelector("#fphone");
var formStorageKey = "galerie-lead";

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.remove("error", "success");

  if (type) {
    formStatus.classList.add(type);
  }
}

leadForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var textFields = [fnameField, femailField, fpassField, fphoneField];

  for (var i = 0; i < textFields.length; i++) {
    if (textFields[i].value.trim() === "") {
      setFormStatus("Заполните все текстовые поля формы", "error");
      return;
    }
  }

  var visitTime = document.querySelector('input[name="visit_time"]:checked');
  var newsChoice = document.querySelector('input[name="news"]:checked');

  if (visitTime === null || newsChoice === null) {
    setFormStatus("Выберите вариант в обеих группах радиокнопок", "error");
    return;
  }

  var formData = {
    name: fnameField.value,
    email: femailField.value,
    password: fpassField.value,
    phone: fphoneField.value
  };

  localStorage.setItem(formStorageKey, JSON.stringify(formData));
  setFormStatus("Заявка успешно отправлена!", "success");
});

var savedForm = localStorage.getItem(formStorageKey);

if (savedForm !== null) {
  try {
    var savedData = JSON.parse(savedForm);

    fnameField.value = savedData.name || "";
    femailField.value = savedData.email || "";
    fpassField.value = savedData.password || "";
    fphoneField.value = savedData.phone || "";
  } catch (error) {
    console.log("Не удалось прочитать сохранённые данные формы:", error);
  }
}



// --- 7. Отзыв с сервера (Fetch API) ---

var loadReviewBtn = document.querySelector("#load-review-btn");
var reviewContent = document.querySelector("#review-content");

loadReviewBtn.addEventListener("click", async function () {
  reviewContent.textContent = "Загрузка отзыва...";

  try {
    var response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=1"
    );

    if (!response.ok) {
      throw new Error("Ошибка сервера: " + response.status);
    }

    var comments = await response.json();
    var comment = comments[0];

    reviewContent.textContent = "«" + comment.body + "» — " + comment.email;
  } catch (error) {
    reviewContent.textContent = "Не удалось загрузить отзыв: " + error.message;
  }
});



// --- 8. Улучшения (необязательный пункт) ---

// Улучшение 1: живые часы в подвале страницы.
var siteClock = document.querySelector("#site-clock");

function updateSiteClock() {
  siteClock.textContent = new Date().toLocaleTimeString();
}

updateSiteClock();
setInterval(updateSiteClock, 1000);

// Улучшение 2: анимация появления новой записи в избранном — класс "fav-in"
// добавляется новому <li> при создании (см. раздел 3 выше), а CSS-правило
// @keyframes fav-in плавно проявляет элемент на странице.

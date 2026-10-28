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
    var clickedCard = event.target.closest(".feature-card");

    if (clickedCard !== null) {
        var cardTitle = clickedCard.querySelector("h3").textContent;
        var isSelected = clickedCard.classList.contains("selected");

        if (isSelected) {
            clickedCard.classList.remove("selected");

            Array.prototype.forEach.call(favoritesList.children, function (item) {
                if (item.dataset.title === cardTitle) {
                    item.remove();
                }
            });

            updateFavoritesEmpty();
        } else {
            clickedCard.classList.add("selected");

            var favoriteItem = document.createElement("li");
            favoriteItem.textContent = cardTitle;
            favoriteItem.dataset.title = cardTitle;
            favoriteItem.classList.add("fav-in");

            var removeFavBtn = document.createElement("button");
            removeFavBtn.type = "button";
            removeFavBtn.textContent = "✕";
            removeFavBtn.classList.add("remove-fav-btn");

            removeFavBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                favoriteItem.remove();
                clickedCard.classList.remove("selected");
                updateFavoritesEmpty();
            });

            favoriteItem.appendChild(removeFavBtn);
            favoritesList.appendChild(favoriteItem);
            updateFavoritesEmpty();
        }
    }
});

var promoTimer = document.querySelector("#promo-timer");
var promoBadge = document.querySelector(".badge");
var promoProgress = document.querySelector("#promo-progress");
var promoTotalSeconds = 300;
var promoSecondsLeft = promoTotalSeconds;

var promoIntervalId = setInterval(function () {
    promoSecondsLeft--;

    var minutes = Math.floor(promoSecondsLeft / 60);
    var seconds = promoSecondsLeft % 60;

    if (promoTimer !== null) {
        promoTimer.textContent =
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds);
    }

    if (promoProgress !== null) {
        var widthPercent = (promoSecondsLeft / promoTotalSeconds) * 100;
        promoProgress.style.width = widthPercent + "%";
    }

    if (promoSecondsLeft <= 0) {
        clearInterval(promoIntervalId);
        if (promoBadge !== null) {
            promoBadge.textContent = "Акция завершена";
        }
    }
}, 1000);

var leadForm = document.querySelector(".form-section form");
var formStatus = document.querySelector("#form-status");
var fnameField = document.querySelector("#fname");
var femailField = document.querySelector("#femail");
var fpassField = document.querySelector("#fpass");
var fphoneField = document.querySelector("#fphone");
var formStorageKey = "galerie-lead";

fphoneField.addEventListener("input", function (e) {
    var input = e.target.value.replace(/\D/g, "");

    if (!input) {
        e.target.value = "";
        return;
    }

    if (input[0] === "8" || input[0] === "9") {
        input = "7" + (input[0] === "9" ? input : input.substring(1));
    } else if (input[0] !== "7") {
        input = "7" + input;
    }

    var result = "+7 ";
    if (input.length > 1) {
        result += "(" + input.substring(1, 4);
    }
    if (input.length >= 5) {
        result += ")-" + input.substring(4, 7);
    }
    if (input.length >= 8) {
        result += "-" + input.substring(7, 9);
    }
    if (input.length >= 10) {
        result += "-" + input.substring(9, 11);
    }

    e.target.value = result;
});

fphoneField.addEventListener("keydown", function(e) {
    if (e.key === "Backspace" && fphoneField.value.length <= 4) {
        fphoneField.value = "";
    }
});

function setFormStatus(message, type) {
    if (formStatus === null) return;
    formStatus.textContent = message;
    formStatus.classList.remove("error", "success");

    if (type) {
        formStatus.classList.add(type);
    }
}

leadForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var textFields = [fnameField, femailField, fpassField, fphoneField];
    var hasErrors = false;

    for (var i = 0; i < textFields.length; i++) {
        var field = textFields[i];
        field.classList.remove("error-input");

        if (field.value.trim() === "" || !field.checkValidity()) {
            field.classList.add("error-input");
            hasErrors = true;
        }
    }

    if (hasErrors) {
        setFormStatus("Пожалуйста, корректно заполните все выделенные поля", "error");
        return;
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

leadForm.addEventListener("reset", function () {
    setFormStatus("", "");

    var textFields = [fnameField, femailField, fpassField, fphoneField];
    for (var i = 0; i < textFields.length; i++) {
        textFields[i].classList.remove("error-input");
    }

    localStorage.removeItem(formStorageKey);
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

var loadReviewBtn = document.querySelector("#load-review-btn");
var reviewContent = document.querySelector("#review-content");

if (loadReviewBtn !== null) {
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
}

var siteClock = document.querySelector("#site-clock");

function updateSiteClock() {
    if (siteClock !== null) {
        siteClock.textContent = new Date().toLocaleTimeString();
    }
}

updateSiteClock();
setInterval(updateSiteClock, 1000);
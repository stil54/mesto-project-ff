// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardTitle, cardimage, deletedCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = cardTitle;
    cardElement.querySelector(".card__image").src = cardimage;
    cardElement.querySelector(".card__image").alt = cardTitle;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", (event) => {
        deletedCard(event);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function deletedCard(event) {
    const listItem = event.target.closest(".card");
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(({ name, link }) => {
    const cardData = createCard(name, link, deletedCard);
    cardList.append(cardData);
});

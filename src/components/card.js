// Функция создания карточки
export function createCard(cardTemplate, cardTitle, cardimage, deletedCard) {
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

// Функция удаления карточки
export function deletedCard(event) {
    const listItem = event.target.closest(".card");
    listItem.remove();
}

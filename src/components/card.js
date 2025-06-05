// Функция создания карточки
export function createCard(cardTemplate, cardTitle, cardimage, deletedCard, likeButton) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const like = cardElement.querySelector(".card__like-button");

    cardElement.querySelector(".card__title").textContent = cardTitle;
    cardElement.querySelector(".card__image").src = cardimage;
    cardElement.querySelector(".card__image").alt = cardTitle;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", (event) => {
        deletedCard(event);
    });

    like.addEventListener('click', likeButton);

    return cardElement;
}

// Функция удаления карточки
export function deletedCard(event) {
    const listItem = event.target.closest(".card");
    listItem.remove();
}

// Функция обработки лайка
export function likeButton(event) {
    event.target.classList.toggle('card__like-button_is-active');
};
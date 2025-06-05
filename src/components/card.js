// Функция создания карточки
export function createCard(cardTemplate, link, name, imageModal, deletedCard, likeButton, openImage) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image")
    const like = cardElement.querySelector(".card__like-button");

    cardElement.querySelector(".card__title").textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
        deletedCard(cardElement);
    });

    like.addEventListener('click', likeButton);

    cardImage.addEventListener('click', () => 
        openImage(imageModal, link, name)
    );

    return cardElement;
}

// Функция удаления карточки
export function deletedCard(card) {
    card.remove();

}

// Функция обработки лайка
export function likeButton(event) {
    event.target.classList.toggle('card__like-button_is-active');
};

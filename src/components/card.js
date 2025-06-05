export function createCard({ template, data, handlers }) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Заполнение данными
  cardElement.querySelector(".card__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Обработчики событий
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", handlers.like);
  cardImage.addEventListener("click", handlers.image);

  return cardElement;
}

// Функции работы с карточками
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки лайка
export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

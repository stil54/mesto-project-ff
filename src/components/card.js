export const createCard = ({ template, data, handlers }) => {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Заполнение данными
  const { name, link } = data;
  const { delete: deleteHandler, like, image } = handlers;

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Обработчики событий
  deleteButton.addEventListener("click", () => deleteHandler(cardElement));
  likeButton.addEventListener("click", like);
  cardImage.addEventListener("click", image);

  return cardElement;
};

// Функции работы с карточками
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

export const likeCard = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

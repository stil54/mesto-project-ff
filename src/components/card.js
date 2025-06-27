import { likeCardApi, unlikeCardApi } from "./api.js";

export const createCard = ({ template, data, handlers, userId }) => {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const elements = {
    image: cardElement.querySelector(".card__image"),
    likeButton: cardElement.querySelector(".card__like-button"),
    deleteButton: cardElement.querySelector(".card__delete-button"),
    likeCount: cardElement.querySelector(".card__like-count"),
    title: cardElement.querySelector(".card__title")
  };

  // Заполнение данными
  const { name, link, likes = [], owner, _id } = data;
  const { delete: deleteHandler, like, image } = handlers;

  cardElement.dataset.cardId = _id;
  elements.title.textContent = name;
  elements.image.src = link;
  elements.image.alt = name;
  elements.likeCount.textContent = likes.length;

  // Проверка, лайкнул ли текущий пользователь карточку
  if (likes.some((like) => like._id === userId)) {
    elements.likeButton.classList.add("card__like-button_is-active");
  }

  elements.deleteButton.style.display = owner._id === userId ? "block" : "none";

  // Показывать кнопку удаления только для своих карточек
  if (owner._id === userId) {
    elements.deleteButton.addEventListener("click", () => deleteHandler(cardElement));
  }
  // Обработчики событий
  elements.likeButton.addEventListener("click", like);
  elements.image.addEventListener("click", image);

  return cardElement;
};

// Функции работы с карточками
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

export const likeCard = (event) => {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");

  if (!cardElement) {
    console.error("Не удалось найти элемент карточки");
    return;
  }

  const likeCountElement = cardElement.querySelector(".card__like-count");
  const cardId = cardElement.dataset.cardId;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Блокируем кнопку на время запроса
  likeButton.disabled = true;

  const apiCall = isLiked ? unlikeCardApi(cardId) : likeCardApi(cardId);

  apiCall
    .then((updatedCard) => {
      // Обновляем UI на основе ответа сервера
      likeCountElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    })
    .finally(() => {
      likeButton.disabled = false;
    });
};

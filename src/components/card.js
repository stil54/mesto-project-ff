export const createCard = ({ template, data, handlers, userId }) => {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Заполнение данными
  const { name, link, likes, owner } = data;
  const { delete: deleteHandler, like, image } = handlers;

  cardElement.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  
  // Установка количества лайков
  likeCount.textContent = likes.length;
  
  // Проверка, лайкнул ли текущий пользователь карточку
  if (likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  
  // Показывать кнопку удаления только для своих карточек
  if (owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

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
  const likeButton = event.target;
  const cardElement = likeButton.closest('.card');
  const likeCount = cardElement.querySelector('.card__like-count');

  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    likeButton.classList.remove('card__like-button_is-active');
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  } else {
    likeButton.classList.add('card__like-button_is-active');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
};

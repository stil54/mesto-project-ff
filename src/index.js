// Импорт стилей
import "./pages/index.css";

// Импорт изображений
import logo from "./images/logo.svg";

// Импорт модулей
import { createCard, likeCard } from "./components/card.js";
import { initPopups, openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  newCardApi,
  deleteCardApi,
  updateAvatar,
} from "./components/api.js";

// DOM элементы
const elements = {
  logo: document.querySelector(".header__logo"),
  avatar: document.querySelector(".profile__image"),
  cardTemplate: document.querySelector("#card-template").content,
  cardList: document.querySelector(".places__list"),
  editModal: document.querySelector(".popup_type_edit"),
  editButton: document.querySelector(".profile__edit-button"),
  imageModal: document.querySelector(".popup_type_image"),
  addButton: document.querySelector(".profile__add-button"),
  addModal: document.querySelector(".popup_type_new-card"),
  name: document.querySelector(".profile__title"),
  job: document.querySelector(".profile__description"),
  avatarPopup: document.querySelector(".popup_type_change-avatar"),
  avatarForm: document.querySelector(".popup_type_change-avatar .popup__form"),
  avatarInput: document.querySelector("#avatar-input"),
  avatarImage: document.querySelector(".profile__image"),
  avatarInputError: document.querySelector(".avatar-input-error"),
};

// Формы
const forms = {
  editProfile: elements.editModal.querySelector(".popup__form"),
  addCard: elements.addModal.querySelector(".popup__form"),
};

// Поля ввода
const inputs = {
  name: forms.editProfile.querySelector(".popup__input_type_name"),
  description: forms.editProfile.querySelector(
    ".popup__input_type_description"
  ),
  placeName: forms.addCard.querySelector(".popup__input_type_card-name"),
  imageLink: forms.addCard.querySelector(".popup__input_type_url"),
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Получаем данные пользователя
// const userData = await getUserInfo();
// const userCards = await getInitialCards();
let currentUser = null;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUser = user;
    setupUI(user);
    renderInitialCards(cards, user._id);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

// Инициализация приложения
function init() {
  enableValidation(validationConfig);
  initPopups();
  setupEventListeners();
  console.log("Приложение успешно запущено!");
}

// Настройка интерфейса
function setupUI(data) {
  // Устанавливаем логотип и аватар
  elements.logo.src = logo;
  elements.avatar.style.backgroundImage = `url(${data.avatar})`;
  elements.name.textContent = data.name;
  elements.job.textContent = data.about;

  // Добавляем анимацию для всех попапов
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}

// Рендер начальных карточек
function renderInitialCards(cards, userId) {
  cards.forEach((card) => {
    elements.cardList.append(createCardElement(card, userId));
  });
}

// Создание карточки
function createCardElement(cardData, userId) {
  return createCard({
    template: elements.cardTemplate,
    data: cardData,
    handlers: {
      delete: handleDeleteCard,
      like: likeCard,
      image: () => openImagePopup(cardData.link, cardData.name),
    },
    userId: userId,
  });
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Редактирование профиля
  elements.editButton.addEventListener("click", handleEditClick);
  forms.editProfile.addEventListener("submit", handleEditSubmit);

  // Добавление карточки
  elements.addButton.addEventListener("click", () => {
    forms.addCard.reset();
    clearValidation(forms.addCard, validationConfig);
    openPopup(elements.addModal);
  });
  forms.addCard.addEventListener("submit", handleAddCardSubmit);

  // Обработчик клика по аватару
  elements.avatarImage.addEventListener("click", () => {
    elements.avatarForm.reset();
    openPopup(elements.avatarPopup);
    clearValidation(elements.avatarForm, validationConfig);
  });

  // Обработчик отправки формы аватара
  elements.avatarForm.addEventListener("submit", handleAvatarSubmit);
}

// Обработчики событий
function handleEditClick() {
  inputs.name.value = elements.name.textContent;
  inputs.description.value = elements.job.textContent;
  clearValidation(forms.editProfile, validationConfig);
  openPopup(elements.editModal);
}

// Обработка сохранения профиля
function handleEditSubmit(evt) {
  evt.preventDefault();

  if (!evt.target.checkValidity()) return;

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Сохранение...";

  const newName = inputs.name.value.trim();
  const newDescription = inputs.description.value.trim();

  updateProfile(newName, newDescription)
    .then((updatedUser) => {
      // Обновляем UI
      elements.name.textContent = updatedUser.name;
      elements.job.textContent = updatedUser.about;

      // Закрываем попап
      closePopup(elements.editModal);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
}

//обработчик отправки формы смены аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  const avatarLink = elements.avatarInput.value.trim();

  // UI feedback
  submitButton.disabled = true;
  submitButton.textContent = "Сохранение...";

  updateAvatar(avatarLink)
    .then((userData) => {
      // Обновляем аватар из ответа сервера
      elements.avatarImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(elements.avatarPopup);
      elements.avatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
      elements.avatarInputError.textContent = "Не удалось обновить аватар";
      elements.avatarInputError.classList.add(validationConfig.errorClass);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
}

// Обработка добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  // UI feedback
  submitButton.disabled = true;
  submitButton.textContent = "Создание...";

  const name = inputs.placeName.value.trim();
  const link = inputs.imageLink.value.trim();

  newCardApi(name, link)
    .then((newCard) => {
      // Создаем и добавляем карточку из ответа сервера

      const cardElement = createCardElement(newCard, currentUser._id);
      elements.cardList.prepend(cardElement);

      // Закрываем попап и сбрасываем форму
      forms.addCard.reset();
      closePopup(elements.addModal);
    })
    .catch((error) => {
      console.error("Ошибка при создании карточки:", error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
}

// Удаление карточки
elements.confirmModal = document.querySelector(".popup_type_confirm");
elements.confirmForm = elements.confirmModal.querySelector(".popup__form");

let cardToDelete = null;
const handleDeleteCard = (cardElement) => {
  if (!cardElement || !cardElement.dataset.cardId) {
    console.error("Карточка для удаления не найдена");
    return;
  }

  cardToDelete = cardElement;
  openPopup(elements.confirmModal);
};

elements.confirmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!cardToDelete || !cardToDelete.dataset.cardId) {
    console.error("Нет карточки для удаления");
    closePopup(elements.confirmModal);
    return;
  }

  const cardId = cardToDelete.dataset.cardId;
  const submitButton = evt.submitter;

  submitButton.disabled = true;
  submitButton.textContent = "Удаление...";

  deleteCardApi(cardId)
    .then(() => {
      cardToDelete.remove();
      closePopup(elements.confirmModal);
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Да";
      cardToDelete = null;
    });
});

// Открытие изображения
function openImagePopup(imageSrc, title) {
  const image = elements.imageModal.querySelector(".popup__image");
  const caption = elements.imageModal.querySelector(".popup__caption");

  image.src = imageSrc;
  image.alt = title;
  caption.textContent = title;

  openPopup(elements.imageModal);
}

// Запуск приложения
init();

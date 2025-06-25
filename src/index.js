// Импорт стилей
import "./pages/index.css";
import "./vendor/fonts.css";
import "./vendor/normalize.css";

// Импорт изображений
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";

// Импорт модулей
import { initialCards } from "./components/cards.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { initPopups, openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';

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
  formSelector: '.popup__form',  
  inputSelector: '.popup__input',  
  submitButtonSelector: '.popup__button',  
  inactiveButtonClass: 'popup__button_disabled',  
  inputErrorClass: 'popup__input_type_error',  
  errorClass: 'popup__error_visible'  
};


// Инициализация приложения
function init() {
  enableValidation(validationConfig); 
  setupUI();
  initPopups();
  renderInitialCards();
  setupEventListeners();
  console.log("Приложение успешно запущено!");
}

// Настройка интерфейса
function setupUI() {
  // Устанавливаем логотип и аватар
  elements.logo.src = logo;
  elements.avatar.style.backgroundImage = `url(${avatar})`;

  // Добавляем анимацию для всех попапов
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}

// Рендер начальных карточек
function renderInitialCards() {
  initialCards.forEach((card) => {
    elements.cardList.append(createCardElement(card));
  });
}

// Создание карточки
function createCardElement(cardData) {
  return createCard({
    template: elements.cardTemplate,
    data: cardData,
    handlers: {
      delete: deleteCard,
      like: likeCard,
      image: () => openImagePopup(cardData.link, cardData.name),
    },
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
  elements.name.textContent = inputs.name.value;
  elements.job.textContent = inputs.description.value;
  closePopup();
}

// Обработка добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = createCardElement({
    name: inputs.placeName.value,
    link: inputs.imageLink.value,
  });

  elements.cardList.prepend(newCard);
  forms.addCard.reset();
  closePopup();
}

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

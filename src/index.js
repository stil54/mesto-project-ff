// Импорт стилей
import './pages/index.css';
import './vendor/fonts.css';
import './vendor/normalize.css';

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Импорт модулей
import { initialCards } from "./components/cards.js";
import { createCard, likeCard } from "./components/card.js";
import { handlePopup, closePopup, openImage } from './components/modal.js';

// DOM элементы
const elements = {
  logo: document.querySelector('.header__logo'),
  avatar: document.querySelector('.profile__image'),
  cardTemplate: document.querySelector("#card-template").content,
  cardList: document.querySelector(".places__list"),
  editModal: document.querySelector('.popup_type_edit'),
  editButton: document.querySelector('.profile__edit-button'),
  imageModal: document.querySelector('.popup_type_image'),
  addButton: document.querySelector('.profile__add-button'),
  addModal: document.querySelector('.popup_type_new-card'),
  name: document.querySelector('.profile__title'),
  job: document.querySelector('.profile__description'),
};

// Формы
const forms = {
  editProfile: elements.editModal.querySelector('.popup__form'),
  addCard: elements.addModal.querySelector('.popup__form'),
};

// Поля ввода
const inputs = {
  name: forms.editProfile.querySelector('.popup__input_type_name'),
  description: forms.editProfile.querySelector('.popup__input_type_description'),
  placeName: forms.addCard.querySelector('.popup__input_type_card-name'),
  imageLink: forms.addCard.querySelector('.popup__input_type_url'),
};

// Инициализация приложения
function init() {
  setupUI();
  renderInitialCards();
  setupEventListeners();
  console.log('Приложение инициализировано');
}

// Настройка интерфейса
function setupUI() {
  elements.logo.src = logo;
  elements.avatar.style.backgroundImage = `url(${avatar})`;
  
  // Добавление анимации для всех попапов
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
}

// Рендер начальных карточек
function renderInitialCards() {
  initialCards.forEach(card => {
    elements.cardList.append(createCardElement(card));
  });
}

// Создание элемента карточки
function createCardElement(cardData) {
  return createCard({
    template: elements.cardTemplate,
    data: cardData,
    handlers: {
      like: likeCard,
      image: () => openImage(elements.imageModal, cardData.link, cardData.name)
    }
  });
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Редактирование профиля
  elements.editButton.addEventListener('click', handleEditClick);
  forms.editProfile.addEventListener('submit', handleEditSubmit);

  // Добавление карточки
  elements.addButton.addEventListener('click', () => handlePopup(elements.addModal));
  forms.addCard.addEventListener('submit', handleAddCardSubmit);
}

// Обработчики событий
function handleEditClick() {
  inputs.name.value = elements.name.textContent;
  inputs.description.value = elements.job.textContent;
  handlePopup(elements.editModal);
}

function handleEditSubmit(evt) {
  evt.preventDefault();
  elements.name.textContent = inputs.name.value;
  elements.job.textContent = inputs.description.value;
  closePopup();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  
  const newCard = createCardElement({
    name: inputs.placeName.value,
    link: inputs.imageLink.value
  });

  elements.cardList.prepend(newCard);
  forms.addCard.reset();
  closePopup();
}

// Запуск приложения
init();
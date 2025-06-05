// Импорт всех стилей
import './pages/index.css';
import './vendor/fonts.css';
import './vendor/normalize.css';

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';


import {initialCards} from "./components/cards.js"
import {createCard, deletedCard, likeButton} from "./components/card.js"

// Добавляем логотип и аватар
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");


import { handlePopup, openImage, handleEditForm, handleFormAddCard } from './components/modal.js';

const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const imageModal = document.querySelector('.popup_type_image');

const addButton = document.querySelector('.profile__add-button');
const editProfileForm = editModal.querySelector('.popup__form');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const addModal = document.querySelector('.popup_type_new-card');
const addProfileForm = addModal.querySelector('.popup__form');

const placeNameInput = addProfileForm.querySelector('.popup__input_type_card-name');
const imageLinkInput = addProfileForm.querySelector('.popup__input_type_url');

// Для всех модальных окон добавим плавную анимацию
document.querySelectorAll('.popup').forEach((popup) => {popup.classList.add('popup_is-animated');});

// Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardData = createCard(cardTemplate, item.link, item.name, imageModal, deletedCard, likeButton, openImage);
    cardList.append(cardData);
});

// Показываем модальное окно для редактирования личной информации
editButton.addEventListener('click', () => {
    handlePopup(editModal, name, job, nameInput, descriptionInput); 
});

// Показываем модальное окно для добавления карточки
addButton.addEventListener('click', () => {
    handlePopup(addModal); 
});

// Обработка формы редактирования личной информации
editProfileForm.addEventListener('submit', (evt) => handleEditForm(evt, name, job, nameInput, descriptionInput)); 

// Обработка формы добавления карточек
addProfileForm.addEventListener('submit', (evt) => 
    handleFormAddCard(
        evt, 
        cardList,  
        imageLinkInput, 
        placeNameInput,
        imageModal,
        createCard,
        deletedCard,
        likeButton,
        openImage,
        cardTemplate
    )
); 


// Инициализация приложения
console.log('Приложение инициализировано');
// Импорт всех стилей
import './pages/index.css';
import './vendor/fonts.css';
import './vendor/normalize.css';

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';


import {initialCards} from "./components/cards.js"
import {createCard, deletedCard} from "./components/card.js"

// Добавляем логотип и аватар
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");


// @todo: Вывести карточки на страницу
initialCards.forEach(({ name, link }) => {
    const cardData = createCard(cardTemplate, name, link, deletedCard);
    cardList.append(cardData);
});


// Инициализация приложения
console.log('Приложение инициализировано');
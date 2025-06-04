// Импорт всех стилей
import './pages/index.css';
import './vendor/fonts.css';
import './vendor/normalize.css';

// Импорт изображений
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Добавляем логотип и аватар
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Импорт скриптов
import './scripts/cards.js';
import './scripts/index.js';

// Инициализация приложения
console.log('Приложение инициализировано');
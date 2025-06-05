// Функция закрытия попапа
export function closePopup() {
  const popup = document.querySelector(".popup_is-opened");
  if (!popup) return;

  // Удаляем обработчик Escape при закрытии
  document.removeEventListener("keydown", handleEscapeKey);

  popup.classList.remove("popup_is-opened");
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// Открытие попапа
export function openPopup(modal) {
  // Закрываем предыдущий попап, если был открыт
  closePopup();

  // Открываем новый попап
  modal.classList.add("popup_is-opened");

  // Добавляем обработчик Escape
  document.addEventListener("keydown", handleEscapeKey);
}

export function initPopups() {
  // Находим все попапы на странице
  const popups = document.querySelectorAll(".popup");

  // Для каждого попапа добавляем обработчики
  popups.forEach((popup) => {
    // Обработчик клика по крестику
    const closeButton = popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", closePopup);
    }

    // Обработчик клика по оверлею
    popup.addEventListener("mousedown", (event) => {
      if (!event.target.closest(".popup__content")) {
        closePopup();
      }
    });
  });
}

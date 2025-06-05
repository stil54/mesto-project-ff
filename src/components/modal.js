// Функция закрытия попапа
export function closePopup() {
  const popup = document.querySelector(".popup_is-opened");
  if (popup) popup.classList.remove("popup_is-opened");
}

// Открытие попапа
export function handlePopup(modal) {
  modal.classList.add("popup_is-opened");

  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", closePopup);

  modal.addEventListener("click", (event) => {
    if (!event.target.closest(".popup__content")) closePopup();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });
}

// Открытие изображения
export function openImage(modal, imageSrc, title) {
  const img = modal.querySelector(".popup__image");
  img.src = imageSrc;
  img.alt = title;
  modal.querySelector(".popup__caption").textContent = title;
  handlePopup(modal);
}

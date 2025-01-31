/* Открытие модального окна */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addPopupAnimated(popup);
  document.addEventListener("keydown", keyСlosePopup);
}

/* Закрытие модального окна */
  export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyСlosePopup);
}

/* Закрытие модально окна по Esc */
export function keyСlosePopup(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closePopup(popupOpen);
  }
}

/* Функция зазакрытия окная по оверлею*/
export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
  } else if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.currentTarget);
  }
}

/* Анимация модального окна */
export function addPopupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}

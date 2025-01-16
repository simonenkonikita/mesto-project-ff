/* Импотры */
import "../styles/styles.css";
import { initialCards } from "./cards.js";
import {
  getCardElement,
  removeHandler,
  likeClick,
} from "../components/card.js";
import {
  openPopup,
  removePopup,
  openPopupImage,
  handleFormSubmit,
  dataProfile,
  addNewCard,
} from "../components/modal.js";

/* Элементы HTML /  вставка и удаление карточек */
export const templateContainer =
  document.querySelector("#card-template").content;
export const cardContainer = document.querySelector(".places__list");

/* Перебор элементов для создания карточек*/
initialCards.forEach(function (data) {
  const cardEl = getCardElement(data, removeHandler, likeClick, openPopupImage);
  cardContainer.append(cardEl);
});

/* Элементы HTML /  открытие и закрытие модального окна */
const buttonOpenProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");

export const popupProfile = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");

const popupAll = document.querySelectorAll(".popup");

/* Обработчик Открытие модального окна профиля */
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  dataProfile();
});

/* Обработчик Открытие модального окна создния карточки */
buttonOpenNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
});

/* Перебор элементов для закрытия окна */
popupAll.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    /* Закрытие по кнопке */
    if (evt.target.classList.contains("popup__close")) {
      removePopup(popup);
      /* Закрытие по оверлею */
    } else if (evt.target.classList.contains("popup_is-opened")) {
      removePopup(popup);
    }
  });
});

/* Элементы HTML /Редактирование имени и информации о себе */
// Находим форму в DOM
export const formElement = document.forms["edit-profile"];
// Находим поля формы в DOM
export const profileInfo = document.querySelector(".profile__info");
export const nameInput = formElement.elements.name;
export const jobInput = formElement.elements.description;

// Обработчик к форме Редактирование имени и информации о себе :
formElement.addEventListener("submit", handleFormSubmit);

/* Добавление карточки '+' */
export const formCard = document.forms["new-place"];

// Обработчик к форме Добавление карточки '+':
formCard.addEventListener("submit", addNewCard);

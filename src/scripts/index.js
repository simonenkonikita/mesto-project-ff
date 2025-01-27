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
  closePopup,
  handleOverlayClick,
} from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
  setValidation,
} from "../components/validation.js";

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

/* Обработчик Открытие модального окна профиля */
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  clearValidation(popupProfile, setValidation);
  fillProfilePopupInputs();
  enableValidation(setValidation);
});

/* Обработчик Открытие модального окна создния карточки */
buttonOpenNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, setValidation);
  enableValidation(setValidation);
});

/* Элементы HTML / Все попапы на странице */
const popupAll = document.querySelectorAll(".popup");

/* Перебор элементов для закрытия окна по оверлею */
popupAll.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    handleOverlayClick(evt);
  });
});

/* Функция Редактирование имени и информации о себе  */
function handleFormProfile(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputvalueValue = jobInput.value;

  profileInfo.querySelector(".profile__title").textContent = nameInputValue;
  profileInfo.querySelector(".profile__description").textContent =
    jobInputvalueValue;

  closePopup(popupProfile);
}

/* Функция Присваеваем значение полям при открытие формы профиля */
function fillProfilePopupInputs() {
  nameInput.value = profileInfo.querySelector(".profile__title").textContent;
  jobInput.value = profileInfo.querySelector(
    ".profile__description"
  ).textContent;
}

/* Функция открытия изображения */
function openPopupImage(data) {
  const popupImage = document.querySelector(".popup_type_image");
  openPopup(popupImage);
  const imageName = popupImage.querySelector(".popup__image");
  const imageCaption = popupImage.querySelector(".popup__caption");
  imageName.src = data.link;
  imageName.alt = data.name;
  imageCaption.textContent = data.name;
}

/* Функция Добавление карточки '+' */
function addNewCard(evt) {
  evt.preventDefault();
  /* Находим значения */
  const cardNameInput = formCard.elements["place-name"];
  const cardLinkInput = formCard.elements.link;
  const nameInputValue = cardNameInput.value;
  const linkInputValue = cardLinkInput.value;
  /* Передаем значения */
  const cardEl = getCardElement(
    { name: nameInputValue, link: linkInputValue },
    removeHandler,
    likeClick,
    openPopupImage
  );
  console.log(cardEl);

  cardContainer.prepend(cardEl);
  formCard.reset();
  closePopup(popupNewCard);
}

/* Элементы HTML /Редактирование имени и информации о себе */
// Находим форму в DOM
const formProfile = document.forms["edit-profile"];
// Находим поля формы в DOM
export const profileInfo = document.querySelector(".profile__info");
export const nameInput = formProfile.elements.name;
export const jobInput = formProfile.elements.description;

// Обработчик к форме Редактирование имени и информации о себе :
formProfile.addEventListener("submit", handleFormProfile);

/* Добавление карточки '+' */
const formCard = document.forms["new-place"];

// Обработчик к форме Добавление карточки '+':
formCard.addEventListener("submit", addNewCard);

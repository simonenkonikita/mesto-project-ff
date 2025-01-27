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


/* Данные для валидации */
const setValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 


/* enableValidation(setValidation)  */

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
  clearValidation(popupProfile);
  fillProfilePopupInputs();
  enableValidation();
});

/* Обработчик Открытие модального окна создния карточки */
buttonOpenNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
  clearValidation(popupNewCard);
  enableValidation();
});

/* Функция сбрасываем значения значение полям при открытие формы добавления карточки */


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
export const formCard = document.forms["new-place"];

// Обработчик к форме Добавление карточки '+':
formCard.addEventListener("submit", addNewCard);

/* /* ПР 3 / Валидация  */


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add("popup__input_error");
  errorElement.classList.add("popup__input_error_label_active");
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove("popup__input_error_label_active");
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция перебирает все формы на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Функция перебирает все поля в форме и добавляет всем обработчик валидации
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция изменения состояния кнопки формы
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция сброса ошибок при повторном открытии попапа
const clearValidation = (formElement) => {
  const buttonElement = formElement.querySelector(".popup__button");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement);
  });
  formCard.reset();
  toggleButtonState(inputList, buttonElement);
};



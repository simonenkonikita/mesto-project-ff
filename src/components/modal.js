import {
  profileInfo,
  nameInput,
  jobInput,
  popupProfile,
  formCard,
  popupNewCard,
  cardContainer,
} from "../scripts/index.js";
import {
    getCardElement,
    removeHandler,
    likeClick,
  } from "../components/card.js";

/* Функция открытия модального окна */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popupAnimated(popup);
  document.addEventListener("keydown", keyСlosePopup);
}

/* Функция Редактирование имени и информации о себе  */
export function handleFormSubmit(evt) {
  evt.preventDefault(); //  отменяем стандартную отправку формы.

  const nameInputValue = nameInput.value;
  const jobInputvalueValue = jobInput.value;

  profileInfo.querySelector(".profile__title").textContent = nameInputValue;
  profileInfo.querySelector(".profile__description").textContent =
    jobInputvalueValue;

  removePopup(popupProfile);
}

/* Функция Присваеваем значение полям при открытие формы профиля */
export function dataProfile() {
  nameInput.value = profileInfo.querySelector(".profile__title").textContent;
  jobInput.value = profileInfo.querySelector(
    ".profile__description"
  ).textContent;
}

/* Функция закрытия модального окна */
export function removePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyСlosePopup);
}

/* Функция закрытия модально окна по Esc */
export function keyСlosePopup(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    removePopup(popupOpen);
  }
}

/* Функция открытия изображения */
export function openPopupImage(data) {
  const popupImage = document.querySelector(".popup_type_image");
  openPopup(popupImage);
  const imageName = popupImage.querySelector(".popup__image");
  const imageCaption = popupImage.querySelector(".popup__caption");
  imageName.src = data.link;
  imageName.alt = data.name;
  imageCaption.textContent = data.name;
}

/* Функция анимации модального окна */
export function popupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}

/* Функция Добавление карточки '+' */
export function addNewCard(evt) {
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
  cardContainer.prepend(cardEl);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  removePopup(popupNewCard);
}

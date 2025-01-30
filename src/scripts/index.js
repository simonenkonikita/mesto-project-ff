/* Импотры */
import "../styles/styles.css";
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
import {
  getUsersData,
  getCardData,
  sendUsersData,
  sendNewCard,
  changeAvatarUsers,
} from "../components/API.js";

/* Элементы HTML /  вставка и удаление карточек */
const cardContainer = document.querySelector(".places__list");

/* Элементы HTML /  открытие и закрытие модального окна */
const buttonOpenProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

/* Обработчик Открытие модального окна профиля */
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  clearValidation(popupProfile, formProfile, setValidation);
  fillProfilePopupInputs();
  enableValidation(setValidation);
});

/* Обработчик Открытие модального окна создния карточки */
buttonOpenNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, formCard, setValidation);
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

/* Элементы HTML /Редактирование имени и информации о себе */
// Находим форму в DOM
const formProfile = document.forms["edit-profile"];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
// Находим поля формы в DOM
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const popupAvatar = document.querySelector(".popup_type_avatar");
/* const popupNewCard = document.querySelector(".popup_type_new-card"); */
const formAvatar = document.forms["edit-avatar"];
const avatarInput = formAvatar.elements.avatar;

/* Обработчик Открытие модального окна редактирования аватарки*/
profileAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, formAvatar, setValidation);
  enableValidation(setValidation);
});

/* Функция редактирования аватарки*/
function editAvatar(evt) {
  evt.preventDefault();
  changeAvatarUsers(avatarInput.value).then(function (dataUser) {
    profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
  });
  closePopup(popupAvatar);
}

formAvatar.addEventListener("submit", editAvatar);

/* Функция Присваеваем значение полям со страницы при открытие формы профиля */
function fillProfilePopupInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

/* Функция Редактирование имени и информации о себе на странице */
function handleFormProfile(evt) {
  evt.preventDefault();
  sendUsersData(nameInput.value, jobInput.value).then(function (dataUser) {
    profileTitle.textContent = dataUser.name;
    profileDescription.textContent = dataUser.about;
  });
  closePopup(popupProfile);
}

// Обработчик к форме Редактирование имени и информации о себе :
formProfile.addEventListener("submit", handleFormProfile);

/* Функция Редактирование имени и информации о себе на странице с сервера */
function getDataProfile(dataUser) {
  profileTitle.textContent = dataUser.name;
  profileDescription.textContent = dataUser.about;
  profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
}

/* Обработчик Открытие модального окна профиля */
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  clearValidation(popupProfile, formProfile, setValidation);
  fillProfilePopupInputs();
  enableValidation(setValidation);
});

/* Работа с изображением */
const popupImage = document.querySelector(".popup_type_image");
const imageName = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

/* Функция открытия изображения */
function openPopupImage(data) {
  openPopup(popupImage);
  imageName.src = data.link;
  imageName.alt = data.name;
  imageCaption.textContent = data.name;
}

/* Добавление карточки '+' */
const formCard = document.forms["new-place"];

/* Функция Добавление карточки '+' */
function addNewCard(evt) {
  evt.preventDefault();
  const nameInputCard = formCard.elements["place-name"];
  const linkInputCard = formCard.elements.link;

  sendNewCard(nameInputCard.value, linkInputCard.value).then(function (
    dataCard
  ) {
    const cardEl = getCardElement(
      dataCard,
      dataCard.owner._id,
      removeHandler,
      likeClick,
      openPopupImage
    );
    cardContainer.prepend(cardEl);
    formCard.reset();
    closePopup(popupNewCard);
    console.log(dataCard);
  });
}

// Обработчик к форме Добавление карточки '+':
formCard.addEventListener("submit", addNewCard);

Promise.all([getUsersData(), getCardData()]).then(function ([
  dataUser,
  newCard,
]) {
  getDataProfile(dataUser);
  newCard.forEach(function (dataCard) {
    const cardEl = getCardElement(
      dataCard,
      dataUser._id,
      removeHandler,
      likeClick,
      openPopupImage
    );
    cardContainer.append(cardEl);
    console.log(dataUser);
  });
});

const popupButtonAll = document.querySelectorAll(".popup__button");

popupButtonAll.forEach(function (popupButton) {
  popupButton.addEventListener("click", function (evt) {
    changeTextButton(evt);
  });
});

function changeTextButton(evt) {
  evt.target.textContent = "Сохранение...";
}

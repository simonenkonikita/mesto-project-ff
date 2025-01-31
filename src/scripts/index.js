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

/* Контейнер для работы с карточками */
const cardContainer = document.querySelector(".places__list");

/* Открытие и закрытие модального окна */
const buttonOpenProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");

/* Попапы */
const popupAll = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupImage = document.querySelector(".popup_type_image");
const popupButtonAll = document.querySelectorAll(".popup__button");

/* Формы и их поля */
const formCard = document.forms["new-place"];
const nameInputCard = formCard.elements["place-name"];
const linkInputCard = formCard.elements.link;

const formProfile = document.forms["edit-profile"];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;

const formAvatar = document.forms["edit-avatar"];
const avatarInput = formAvatar.elements.avatar;

/* Поля информации о пользователе на странице */
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

/* Поля с попапом картинки */
const imageName = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

/* Добавление карточки '+' */
formCard.addEventListener("submit", function addNewCard(evt) {
  evt.preventDefault();
  sendNewCard(nameInputCard.value, linkInputCard.value).then(function (
    dataCard
  ) {
    const cardEl = getCardElement(
      dataCard,
      dataCard.owner._id,
      removeHandler,
      likeClick,
      openImagePopup
    );
    cardContainer.prepend(cardEl);
    formCard.reset();
    closePopup(popupNewCard);
  });
});

/* Загрузка карточек с сервера */
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
      openImagePopup
    );
    cardContainer.append(cardEl);
  });
});

/* Перебор элементов для закрытия попапов по оверлею */
popupAll.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    handleOverlayClick(evt);
  });
});

/* Перебор кнопок попапов для UX при клике */
popupButtonAll.forEach(function (popupButton) {
  popupButton.addEventListener("click", function (evt) {
    evt.target.textContent = "Сохранение...";
  });
});

/* Открытие модального окна профиля */
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  clearValidation(popupProfile, formProfile, setValidation);
  fillProfilePopupInputs();
  enableValidation(setValidation);
});

/* Присваеваем значение полям со страницы при открытие формы профиля */
function fillProfilePopupInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

/* Редактирование имени и информации о себе  */
formProfile.addEventListener("submit", function handleFormProfile(evt) {
  evt.preventDefault();
  sendUsersData(nameInput.value, jobInput.value).then(function (dataUser) {
    profileTitle.textContent = dataUser.name;
    profileDescription.textContent = dataUser.about;
  });
  closePopup(popupProfile);
});

/* Редактирование имени и информации о себе на странице с сервера */
function getDataProfile(dataUser) {
  profileTitle.textContent = dataUser.name;
  profileDescription.textContent = dataUser.about;
  profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
}

/* Открытие модального окна создания карточки */
buttonOpenNewCard.addEventListener("click", function () {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, formCard, setValidation);
  enableValidation(setValidation);
});

/* Открытие модального окна редактирования аватарки*/
profileAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, formAvatar, setValidation);
  enableValidation(setValidation);
});

/* Редактирования аватарки*/
formAvatar.addEventListener("submit", function editAvatar(evt) {
  evt.preventDefault();
  changeAvatarUsers(avatarInput.value).then(function (dataUser) {
    profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
  });
  closePopup(popupAvatar);
});

/* Открытие попапа с изображением */
function openImagePopup(data) {
  openPopup(popupImage);
  fillImagePopupInputs(data);
}

/* Присваеваем значение полям с изображением */
function fillImagePopupInputs(data) {
  imageName.src = data.link;
  imageName.alt = data.name;
  imageCaption.textContent = data.name;
}

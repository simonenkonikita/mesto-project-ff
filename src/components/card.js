import { removeCard, sendLikeCard, removeLikeCard } from "../components/API.js";

/* Создание карточек и добавление им обработчиков */
export function getCardElement(
  dataCard,
  UsersID,
  deleteCallback,
  likeCallback,
  imageCallback
) {
  const templateContainer = document.querySelector("#card-template").content;
  const cardEl = templateContainer
    .querySelector(".places__item")
    .cloneNode(true);
  const title = cardEl.querySelector(".card__title");
  const image = cardEl.querySelector(".card__image");
  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;

  const deleteBtn = cardEl.querySelector(".card__delete-button");
  if (dataCard.owner._id !== UsersID) {
    deleteBtn.classList.add("card__delete-button_inactive");
  }
  deleteBtn.addEventListener("click", function (evt) {
    deleteCallback(evt, dataCard._id);
  });

  const buttonLike = cardEl.querySelector(".card__like-button");
  const сounterLike = cardEl.querySelector(".card__like-counter");
  const sumLike = dataCard.likes.length;
  сounterLike.textContent = sumLike;
  buttonLike.addEventListener("click", function (evt) {
    likeCallback(evt, dataCard._id, сounterLike);
  });
  const checkLiked = dataCard.likes.some(function (like) {
    return like._id === UsersID;
  });
  if (checkLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  image.addEventListener("click", function () {
    imageCallback(dataCard);
  });
  return cardEl;
}

/* Удаления карточки*/
export function removeHandler(evt, CardID) {
  removeCard(CardID).then(function () {
    evt.target.closest(".places__item").remove();
  });
}

/* Лайк карточки */
export function likeClick(evt, CardID, сounterLike) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    sendLikeCard(CardID).then(function (sum) {
      evt.target.classList.add("card__like-button_is-active");
      сounterLike.textContent = sum.likes.length;
    });
  } else {
    removeLikeCard(CardID).then(function (sum) {
      evt.target.classList.remove("card__like-button_is-active");
      сounterLike.textContent = sum.likes.length;
    });
  }
}

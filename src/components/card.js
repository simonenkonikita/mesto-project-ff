import { templateContainer } from "../scripts/index.js";

/* Функция вставка и удаление карточек */
export function getCardElement(
  data,
  deleteCallback,
  likeCallback,
  imageCallback
) {
  const cardEl = templateContainer
    .querySelector(".places__item")
    .cloneNode(true);

  const title = cardEl.querySelector(".card__title");
  title.textContent = data.name;

  const image = cardEl.querySelector(".card__image");
  image.src = data.link;
  image.alt = data.name;

  const deleteBtn = cardEl.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCallback);

  const buttonLike = cardEl.querySelector(".card__like-button");
  buttonLike.addEventListener("click", likeCallback);

  image.addEventListener("click", function () {
    imageCallback(data);
  });

  return cardEl;
}

/* Функция удаления карточки*/
export function removeHandler(evt) {
  evt.target.closest(".places__item").remove();
}

/* Функция лайк карточки */
export function likeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

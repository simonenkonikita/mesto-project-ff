const templateContainer = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

function getCardElement(data, deleteCallback) {
  const cardEl = templateContainer
    .querySelector(".places__item")
    .cloneNode(true);

  const title = cardEl.querySelector(".card__title");
  title.textContent = data.name;

  const image = cardEl.querySelector(".card__image");
  image.src = data.link;

  const deleteBtn = cardEl.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCallback);

  return cardEl;
}

initialCards.forEach(function (item) {
  const cardEl = getCardElement(item, function () {
    cardEl.remove();
  });
  cardContainer.append(cardEl);
});

// @todo: Темплейт карточки
const templateContainer = document.querySelector("#card-template");

// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки

initialCards.forEach(function createCard(item) {
  const cardElement = templateContainer.content.cloneNode(true);
  const cardItem = cardElement.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent =item.name;
    cardImage.src = item.link;
  cardContainer.append(cardElement);
  addButton.addEventListener("click", createCard);
 
});


// @todo: Функция удаления карточки
const deleteButton = cardContainer.querySelector(".card__delete-button");
const deleteElement = document.querySelector(".card");

function deleteBtn() {
  deleteElement.remove();
}

deleteButton.addEventListener("click", deleteBtn);
console.log(deleteElement);

// @todo: Вывести карточки на страницу


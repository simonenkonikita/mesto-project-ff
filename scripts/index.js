
const templateContainer = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');


initialCards.forEach(function addCard(item) {
  const cardElement = templateContainer.querySelector('.places__item').cloneNode(true);
  cardContainer.append(cardElement);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  addButton.addEventListener('click', addCard);
});

const cardElement = document.querySelector('.places__item');
const deleteButton = document.querySelector('.card__delete-button');

function deleteBtn() {
  cardElement.remove();
};

deleteButton.addEventListener('click', deleteBtn);

console.log(cardElement);
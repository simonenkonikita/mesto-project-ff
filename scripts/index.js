
const templateContainer = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

initialCards.forEach(function (item) {
  const cardElement = templateContainer.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardContainer.append(cardElement);
});

function addCard() {
  const cardItem = templateContainer.querySelector('.places__item').cloneNode(true);
  cardContainer.append(cardItem);
} 

addButton.addEventListener('click', addCard);

const cardElement = templateContainer.querySelector('.places__item');
const deleteButton = document.querySelector('card__delete-button');


function deleteBtn() {
  cardContainer.remove();
 
};

deleteButton.addEventListener('click', deleteBtn);



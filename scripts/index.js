const templateContainer = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

function getCardElement(data, deleteCallback) {
  const cardEl = templateContainer
    .querySelector('.places__item')
    .cloneNode(true);

  const title = cardEl.querySelector('.card__title');
  title.textContent = data.name;

  const image = cardEl.querySelector('.card__image');
  image.src = data.link;
  image.alt = data.name;

  const deleteBtn = cardEl.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCallback);

  return cardEl;
}
 
function removeHandler(event) {
  event.target.closest('.places__item').remove();

}

initialCards.forEach(function (data) {
  const cardEl = getCardElement(data, removeHandler);
  cardContainer.append(cardEl);
});

  


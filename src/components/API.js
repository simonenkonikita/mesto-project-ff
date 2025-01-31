const config = {
  baseUrl: "https://nomoreparties.co./v1",
  basePathUrl: "/wff-cohort-31",
  headers: {
    authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
    "Content-Type": "application/json",
  },
};

export function handlerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUsersData() {
  return fetch(`${config.baseUrl + config.basePathUrl}/users/me/`, {
    method: "GET",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
    },
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function getCardData() {
  return fetch(`${config.baseUrl + config.basePathUrl}/cards/`, {
    method: "GET",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
    },
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function sendUsersData(nameUsers, description) {
  return fetch(`${config.baseUrl + config.basePathUrl}/users/me/`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameUsers,
      about: description,
    }),
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function sendNewCard(nameCard, linkCard) {
  return fetch(`${config.baseUrl + config.basePathUrl}/cards/`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function removeCard(CardID) {
  return fetch(`${config.baseUrl + config.basePathUrl}/cards/` + CardID, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function sendLikeCard(CardID) {
  return fetch(`${config.baseUrl + config.basePathUrl}/cards/likes/` + CardID, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function removeLikeCard(CardID) {
  return fetch(`${config.baseUrl + config.basePathUrl}/cards/likes/` + CardID, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

export function changeAvatarUsers(link) {
  return fetch(`${config.baseUrl + config.basePathUrl}/users/me/avatar/`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(handlerResponse)
    .catch(function (err) {
      console.log(err);
    });
}

const URL = {
  requestURL: "https://nomoreparties.co/v1",
  pathUsersURL: "/wff-cohort-31/users/me",
  pathCardURL: "/wff-cohort-31/cards",
};

export function handlerResponse(res) {
  if (res.ok) {
    return res.json();
  
  }
}

export function getUsersData() {
  return fetch(URL.requestURL + URL.pathUsersURL, {
    method: "GET",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
    },
  }).then(handlerResponse);
}

export function getCardData() {
  return fetch(URL.requestURL + URL.pathCardURL, {
    method: "GET",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
    },
  }).then(handlerResponse);
}

export function sendUsersData(nameUsers, description) {
  return fetch(URL.requestURL + URL.pathUsersURL, {
    method: "PATCH",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameUsers,
      about: description,

    }),
  }).then(handlerResponse);
}

export function sendNewCard(nameCard, linkCard) {
  return fetch(URL.requestURL + URL.pathCardURL, {
    method: "POST",
    headers: {
      authorization: "8097a63f-5a03-493b-9364-1b306dfb459f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then(handlerResponse);
}



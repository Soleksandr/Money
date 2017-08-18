export const getUsers = () =>
  fetch('/users', {
    method: 'GET',
    credentials: 'include',
  }).then(users => users.json());

export const addUser = data =>
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(user => user.json());

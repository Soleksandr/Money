export const getUsers = () =>
  fetch('/users', {
    method: 'GET',
  }).then(users => users.json());

export const addUser = data =>
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(user => user.json());

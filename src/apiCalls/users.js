export const getUsers = () =>
  fetch('./users', {
    method: 'GET',
  }).then(users => users.json());

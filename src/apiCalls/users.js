export const getUsers = () =>
  fetch('/backend/users', {
    method: 'GET',
    credentials: 'include',
  }).then(users => users.json());

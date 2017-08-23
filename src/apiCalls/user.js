export const userInitialize = () =>
fetch('backend', {
  method: 'GET',
  credentials: 'include',
}).then(user => user.json());

export const createUser = data =>
fetch('backend/registration', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(data),
}).then(user => user.json());

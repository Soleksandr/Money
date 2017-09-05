export const userInitialize = () =>
  fetch('/backend', {
    method: 'GET',
    credentials: 'include',
  }).then(user => user.json());

export const login = data =>
  fetch('/backend/authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(user => user.json());

export const logout = () =>
  fetch('/backend/logout', {
    method: 'GET',
    credentials: 'include',
  }).then(data => data.json());

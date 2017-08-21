// export const getUser = () =>
// fetch('/user', {
//   method: 'GET',
//   credentials: 'include',
// }).then(user => user.json());

export const createUser = data =>
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(data),
}).then(user => user.json());

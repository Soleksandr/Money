export const getTransactions = () =>
  fetch('/transactions', {
    method: 'GET',
    credentials: 'include',
  }).then(transactions => transactions.json());

export const createTransaction = data =>
  fetch('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(transactions => transactions.json());

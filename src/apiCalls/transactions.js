export const getTransactions = () =>
  fetch('/backend/transactions', {
    method: 'GET',
    credentials: 'include',
  }).then(transactions => transactions.json());

export const createTransaction = data =>
  fetch('/backend/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(transactions => transactions.json());

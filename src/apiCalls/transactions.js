export const getTransactions = () =>
  fetch('/transactions', {
    method: 'GET',
  }).then(transactions => transactions.json());

export const addTransaction = data =>
  fetch('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(transactions => transactions.json());

export const fetchQuery = (query, variables = {}) =>
  fetch('/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  }).then(resp => resp.json());

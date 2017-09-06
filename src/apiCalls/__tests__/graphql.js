import { fetchQuery } from '../graphql';

const mockJson = jest.fn();
window.fetch = jest.fn(() => Promise.resolve({
  json: mockJson,
}));

window.JSON.stringify = jest.fn();

const mockQuery = 'query';
const mockVariables = 'variables';

describe('Test graphql apiCall', () => {
  it('shoud calls mockJson', () =>
    fetchQuery().then(() => expect(mockJson).toBeCalled()));

  it('shoud calls window.JSON.stringify', () =>
    fetchQuery().then(() => expect(window.JSON.stringify).toBeCalled()));

  it('shoud calls window.fetch with proper argumets', () =>
    fetchQuery(mockQuery, mockVariables).then(() => expect(window.fetch).toBeCalledWith(
      '/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ mockQuery, mockVariables }),
      },
    )));
});

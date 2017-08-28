import fetchMock from 'fetch-mock';
import * as apiCalls from '../users';

const mockUsers = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
  },
];

describe('Test users apiCalls', () => {
  it('apiCalls.getUsers should return proper data', () => {
    fetchMock.get('/backend/users', mockUsers);
    apiCalls.getUsers().then(data =>
      expect(data).toEqual(mockUsers),
    );
  });
});

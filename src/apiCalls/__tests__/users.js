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

const mockUser = {
  name: 'Evgeny',
  surname: 'Onegin',
};

describe('Test users apiCalls', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('apiCalls.getUsers should return proper data', () => {
    fetchMock.get('/users', mockUsers);
    apiCalls.getUsers().then(data =>
      expect(data).toEqual(mockUsers),
    );
  });

  it('apiCalls.addTransaction should has ', () => {
    fetchMock.post('/users', mockUser);
    apiCalls.addUser(mockUser).then(data =>
      expect(data).toEqual(mockUser),
    );
  });
});

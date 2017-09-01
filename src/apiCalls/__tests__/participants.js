import fetchMock from 'fetch-mock';
import * as apiCalls from '../participants';

const mockParticipants = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
    money: 1,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
    money: 1,
  },
];

describe('Test participants apiCalls', () => {
  it('apiCalls.getParticipants should return proper data', () => {
    fetchMock.get('/backend/users/participants', mockParticipants);
    apiCalls.getParticipants().then(data =>
      expect(data).toEqual(mockParticipants),
    );
  });
});

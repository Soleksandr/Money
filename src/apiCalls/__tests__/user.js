import fetchMock from 'fetch-mock';
import * as apiCalls from '../user';

const mockUser = {
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

describe('Test user apiCalls', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('apiCalls.userInitialize should return proper data', () => {
    fetchMock.get('/backend', mockUser);
    apiCalls.userInitialize().then(data =>
      expect(data).toEqual(mockUser),
    );
  });

  it('apiCalls.login should return proper data', () => {
    fetchMock.post('/backend/authentication', mockUser);
    apiCalls.login(mockUser).then(data =>
      expect(data).toEqual(mockUser),
    );
  });

  it('apiCalls.logout should return proper data', () => {
    fetchMock.get('/backend/logout', mockUser);
    apiCalls.logout().then(data =>
      expect(data).toEqual(mockUser),
    );
  });
});

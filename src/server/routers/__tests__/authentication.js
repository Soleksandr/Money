const authenticationRouter = require('../authentication');

const mockRequest = {
  login: jest.fn((id, callback) => { callback(); }),
  user: {
    username: 'ivan',
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
};

const mockResponse = {
  json: jest.fn(),
};

describe('Test users router', () => {
  describe('login function', () => {
    it('should calls mockResponse.json with proper arguments', () => {
      authenticationRouter.login(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockRequest.user);
    });
  });
});

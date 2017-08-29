const authenticationRouter = require('../authentication');

const mockUser = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login function', () => {
    it('should calls mockRequest.login with proper arguments', () => {
      authenticationRouter.login(mockRequest, mockResponse);
      expect(mockRequest.login).toBeCalledWith(mockRequest.user.id, expect.any(Function));
    });

    it('should calls mockResponse.json with proper arguments', () => {
      authenticationRouter.login(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith({
        id: mockUser.id,
        username: mockUser.username,
        name: mockUser.name,
        surname: mockUser.surname,
      });
    });
  });
});

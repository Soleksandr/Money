const usersRouter = require('../users');
const handlers = require('../../handlers/users');

const mockUser = {
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockRequest = {
  body: jest.fn(),
  params: {
    id: 1,
  },
};

const mockResponse = {
  json: jest.fn(),
  sendStatus: jest.fn(),
};

jest.mock('../../handlers/users', () => ({
  getUsers: jest.fn(() => Promise.resolve([mockUser])),
}));

describe('Test users router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers function', () => {
    it('should calls handlers.getUsers', () =>
      usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(handlers.getUsers).toBeCalled(),
      ),
    );

    it('should calls mockResponse.json with proper argument', () =>
      usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith([mockUser]),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getUsers.mockImplementationOnce(() => Promise.resolve(null));
      return usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });
  });
});

const registrationRouter = require('../registration');
const handlers = require('../../handlers/registration');

const mockUser = {
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
  sendStatus: jest.fn(),
};

jest.mock('../../handlers/registration', () => ({
  createUser: jest.fn(() => Promise.resolve(mockUser)),
}));

describe('Test registration router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser function', () => {
    it('should calls handlers.createUser with mockRequest.body', () =>
      registrationRouter.createUser(mockRequest, mockResponse).then(() =>
        expect(handlers.createUser).toBeCalledWith(mockRequest.body),
      ),
    );

    it('should calls mockResponse.json with mockUser', () =>
      registrationRouter.createUser(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith(mockUser),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.createUser.mockImplementationOnce(() => Promise.reject(null));
      registrationRouter.createUser(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });
  });
});

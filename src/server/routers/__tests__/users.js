const usersRouter = require('../users');
const handlers = require('../../handlers/users');

const mockUser = {
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockTransaction = {
  title: 'goods',
  cost: 50,
  payerId: 1,
  participantsId: [1, 2],
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
  createUser: jest.fn(() => mockUser),
  getUsers: jest.fn(() => [mockUser]),
  getUser: jest.fn(() => mockUser),
  getUserTransaction: jest.fn(() => mockTransaction),
  getUserTransactions: jest.fn(() => [mockTransaction]),
}));

describe('Test users router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser function', () => {
    it('should calls handlers.createUser with mockRequest.body', () => {
      usersRouter.createUser(mockRequest, mockResponse);
      expect(handlers.createUser).toBeCalledWith(mockRequest.body);
    });

    it('should calls mockResponse.json with mockUser', () => {
      usersRouter.createUser(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockUser);
    });

    it('should calls mockResponse.sendStatus with 400', () => {
      handlers.createUser.mockImplementationOnce(() => null);
      usersRouter.createUser(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(400);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.createUser.mockImplementationOnce(() => undefined);
      usersRouter.createUser(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });

  describe('getUsers function', () => {
    it('should calls handlers.getUsers', () => {
      usersRouter.getUsers(mockRequest, mockResponse);
      expect(handlers.getUsers).toBeCalled();
    });

    it('should calls mockResponse.json with [mockUser]', () => {
      usersRouter.getUsers(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith([mockUser]);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getUsers.mockImplementationOnce(() => null);
      usersRouter.getUsers(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });

  describe('getUser function', () => {
    it('should calls handlers.getUser with mockRequest.params.id', () => {
      usersRouter.getUser(mockRequest, mockResponse);
      expect(handlers.getUser).toBeCalledWith(mockRequest.params.id);
    });

    it('should calls mockResponse.json with mockUser', () => {
      usersRouter.getUser(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockUser);
    });

    it('should calls mockResponse.sendStatus with 404', () => {
      handlers.getUser.mockImplementationOnce(() => null);
      usersRouter.getUser(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(404);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getUser.mockImplementationOnce(() => undefined);
      usersRouter.getUser(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });

  describe('getUserTransactions function', () => {
    it('should calls handlers.getUserTransactions with mockRequest.params.id', () => {
      usersRouter.getUserTransactions(mockRequest, mockResponse);
      expect(handlers.getUserTransactions).toBeCalledWith(mockRequest.params.id);
    });

    it('should calls mockResponse.json with [mockTransaction]', () => {
      usersRouter.getUserTransactions(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith([mockTransaction]);
    });

    it('should calls mockResponse.sendStatus with 404', () => {
      handlers.getUserTransactions.mockImplementationOnce(() => null);
      usersRouter.getUserTransactions(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(404);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getUserTransactions.mockImplementationOnce(() => undefined);
      usersRouter.getUserTransactions(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });
});

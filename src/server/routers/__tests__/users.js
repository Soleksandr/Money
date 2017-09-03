const usersRouter = require('../users');
const usersHandler = require('../../handlers/users');
const transactionsHandler = require('../../handlers/transactions');

const mockUsers = [
  {
    username: 'ivan',
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
  {
    username: 'petr',
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
  },
  {
    username: 'petr',
    name: 'Petr',
    surname: 'Petrov',
    id: 3,
  },
];
const mockTransactions = [
  {
    title: 'test1',
    cost: '1',
    payer: mockUsers[0],
    participants: [mockUsers[0], mockUsers[1]],
    id: 1,
  },
  {
    title: 'test2',
    cost: '2',
    payer: mockUsers[1],
    participants: [mockUsers[2], mockUsers[1]],
    id: 2,
  },
];

const mockRequest = {
  body: jest.fn(),
  user: mockUsers[0],
};

const mockParticipantsHandler = jest.fn();

jest.mock('../../handlers/users', () => ({
  getUsers: jest.fn(() => Promise.resolve(mockUsers)),
}));

jest.mock('../../handlers/transactions', () => ({
  getTransactions: jest.fn(() => Promise.resolve(mockTransactions)),
}));

const mockResponse = {
  json: jest.fn(),
  sendStatus: jest.fn(),
};


describe('Test users router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers function', () => {
    it('should calls handlers.getUsers', () =>
      usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(usersHandler.getUsers).toBeCalled(),
      ),
    );

    it('should calls mockResponse.json with proper argument', () =>
      usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith(mockUsers),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      usersHandler.getUsers.mockImplementationOnce(() => Promise.resolve(null));
      return usersRouter.getUsers(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });
  });

  describe('getParticipants function', () => {
    it('should calls transactionsHandler.getTransactions', () =>
      usersRouter.getParticipants(mockRequest, mockResponse).then(() =>
        expect(transactionsHandler.getTransactions).toBeCalled(),
      ),
    );

    it('should calls mockResponse.json with proper argument', () =>
      usersRouter.getParticipants(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith([mockUsers[1]]),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      transactionsHandler.getTransactions.mockImplementationOnce(() => Promise.resolve(null));
      return usersRouter.getParticipants(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });

    it('usersRouter.getParticipantsPureFunc should return an object', () => {
      expect(usersRouter.getParticipantsPureFunc()).toEqual(expect.any(Function));
    });

    it('mockParticipantsHandler should be called', () =>
      usersRouter.getParticipantsPureFunc(mockParticipantsHandler)(mockRequest, mockResponse).then(() =>
        expect(mockParticipantsHandler).toBeCalled(),
      ),
    );

    it('mockParticipantsHandler should be called with proper arguments', () =>
      usersRouter.getParticipantsPureFunc(mockParticipantsHandler)(mockRequest, mockResponse).then(() =>
        expect(mockParticipantsHandler).toBeCalledWith([], mockUsers[0], mockRequest.user.id),
      ),
    )
  });
});

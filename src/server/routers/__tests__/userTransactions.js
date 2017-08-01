const userTransactions = require('../userTransactions');
const handlers = require('../../handlers/users');

const mockUserTransactions = {
  title: 'test',
  cost: 100,
  payerId: 1,
  participantsId: [1, 2, 3],
  id: 1,
};

jest.mock('../../handlers/users', () => ({
  getTransactionsOfUser: jest.fn(),
}));

const req = {
  params: {
    id: 1,
  },
};

const res = {
  sendStatus: jest.fn(),
  json: jest.fn(),
};

const mockApp = {
  get: jest.fn((route, callback) => {
    callback(req, res);
  }),
};

describe('Test get /users/:id/transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls get method with first argument "/users/:id/transactions" and second any function', () => {
    userTransactions(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/users/:id/transactions', expect.any(Function));
  });

  it('should calls handlers.getTransactionsOfUser with req.params.id parameter', () => {
    userTransactions(mockApp);
    expect(handlers.getTransactionsOfUser).toHaveBeenCalledWith(req.params.id);
  });

  it('json method of res param should be called with mockUserTransactions', () => {
    handlers.getTransactionsOfUser.mockImplementationOnce(() => mockUserTransactions);
    userTransactions(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith(mockUserTransactions);
  });

  it('should calls sendStatus with 404 and should not calls json method of res when transactions value is null', () => {
    handlers.getTransactionsOfUser.mockImplementationOnce(() => null);
    userTransactions(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
    handlers.getTransactionsOfUser.mockImplementationOnce(() => undefined);
    userTransactions(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

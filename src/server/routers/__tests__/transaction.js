const transaction = require('../transaction');
const handlers = require('../../handlers/transactions');

const mockTransaction = {
  title: 'test',
  cost: 100,
  payerId: 1,
  participantsId: [1, 2, 3],
  id: 1,
};

jest.mock('../../handlers/transactions', () => ({
  getTransaction: jest.fn(),
}));

const req = {
  params: {
    transactionId: 1,
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


describe('Test get /users/:id/transactions/:transactionId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls get method with first argument "/transaction" and second any function', () => {
    transaction(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/users/:id/transactions/:transactionId', expect.any(Function));
  });

  it('should calls handlers.getTransaction with req.params.transactionId parameter', () => {
    transaction(mockApp);
    expect(handlers.getTransaction).toHaveBeenCalledWith(req.params.transactionId);
  });

  it('json method of res param should be called with mockTransaction', () => {
    handlers.getTransaction.mockImplementationOnce(() => mockTransaction);
    transaction(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith(mockTransaction);
  });

  it('should calls sendStatus with 404 and should not calls json method of res when transaction value is null', () => {
    handlers.getTransaction.mockImplementationOnce(() => null);
    transaction(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
    handlers.getTransaction.mockImplementationOnce(() => undefined);
    transaction(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

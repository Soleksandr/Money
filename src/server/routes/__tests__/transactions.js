const transactions = require('../transactions');
const handlers = require('../../handlers/transactions');

const mockTransaction = {
  title: 'test',
  cost: 100,
  payerId: 1,
  participantsId: [1, 2, 3],
  id: 1,
};

jest.mock('../../handlers/transactions', () => ({
  createTransaction: jest.fn(),
  getTransactions: jest.fn(),
}));

const req = {
  body: 'test',
};

const res = {
  sendStatus: jest.fn(),
  json: jest.fn(),
};

const mockApp = {
  post: jest.fn((route, callback) => {
    callback(req, res);
  }),
  get: jest.fn((route, callback) => {
    callback(req, res);
  }),
};


describe('Test post /transactions', () => {
  beforeEach(() => {
    mockApp.get.mockImplementationOnce(() => null);
    jest.clearAllMocks();
  });

  it('should calls handlers.createTransaction with req.body parameter', () => {
    transactions(mockApp);
    expect(handlers.createTransaction).toHaveBeenCalledWith(req.body);
  });

  it('json method of res param should be called with mockTransaction', () => {
    handlers.createTransaction.mockImplementationOnce(() => mockTransaction);
    transactions(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith(mockTransaction);
  });

  it('should calls sendStatus with 400 and should not calls json method of res when transaction value is null', () => {
    handlers.createTransaction.mockImplementationOnce(() => null);
    transactions(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
    handlers.createTransaction.mockImplementationOnce(() => undefined);
    transactions(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe('Test get /transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApp.post.mockImplementationOnce(() => null);
  });

  it('should calls get method with first argument "/transactions" and second any function', () => {
    transactions(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/transactions', expect.any(Function));
  });

  it('should calls handlers.getTransactions', () => {
    transactions(mockApp);
    expect(handlers.getTransactions).toBeCalled();
  });

  it('json method of res param should be called with correct transaction value', () => {
    handlers.getTransactions.mockImplementationOnce(() => [mockTransaction]);
    transactions(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith([mockTransaction]);
  });

  it('should calls sendStatus with 500 and should not calls json method of res when transaction value incorrect', () => {
    handlers.getTransactions.mockImplementationOnce(() => undefined);
    transactions(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

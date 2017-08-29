const transactionsRouter = require('../transactions');
const handlers = require('../../handlers/transactions');


const mockTransaction = {
  title: 'goods',
  cost: 50,
  payerId: 1,
  participantsId: [1, 2, 3],
  id: 1,
};

const mockRequest = {
  user: 1,
  params: {
    id: 1,
  },
};

const mockResponse = {
  json: jest.fn(),
  sendStatus: jest.fn(),
};

jest.mock('../../handlers/transactions', () => ({
  createTransaction: jest.fn(() => Promise.resolve(mockTransaction.id)),
  getTransactions: jest.fn(() => Promise.resolve([mockTransaction])),
}));

describe('Test transactions router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction function', () => {
    it('should calls handlers.createTransaction with mockRequest.body', () =>
      transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
        expect(handlers.createTransaction).toBeCalledWith(mockRequest.body),
      ),
    );

    it('should calls mockResponse.json with proper argument ', () =>
      transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith(mockTransaction.id),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.createTransaction.mockImplementationOnce(() => Promise.resolve(null));
      return transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });
  });


  describe('getTransactions function', () => {
    it('should calls handlers.getTransactions', () =>
      transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
        expect(handlers.getTransactions).toBeCalled(),
      ),
    );

    it('should calls mockResponse.json with with proper argument', () =>
      transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith([mockTransaction]),
      ),
    );

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getTransactions.mockImplementationOnce(() => Promise.resolve(null));
      return transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
        expect(mockResponse.sendStatus).toBeCalledWith(500),
      );
    });
  });
});

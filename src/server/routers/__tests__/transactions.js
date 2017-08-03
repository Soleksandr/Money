const transactionsRouter = require('../transactions');
const handlers = require('../../handlers/transactions');

// const mockUser = {
//   name: 'Ivan',
//   surname: 'Ivanov',
//   id: 1,
// };

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

jest.mock('../../handlers/transactions', () => ({
  createTransaction: jest.fn(() => mockTransaction),
  getTransactions: jest.fn(() => [mockTransaction]),
  getTransaction: jest.fn(() => mockTransaction),
}));

describe('Test transactions router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction function', () => {
    it('should calls handlers.createTransaction with mockRequest.body', () => {
      transactionsRouter.createTransaction(mockRequest, mockResponse);
      expect(handlers.createTransaction).toBeCalledWith(mockRequest.body);
    });

    it('should calls mockResponse.json with mockTransaction', () => {
      transactionsRouter.createTransaction(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockTransaction);
    });

    it('should calls mockResponse.sendStatus with 400', () => {
      handlers.createTransaction.mockImplementationOnce(() => null);
      transactionsRouter.createTransaction(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(400);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.createTransaction.mockImplementationOnce(() => undefined);
      transactionsRouter.createTransaction(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });

  describe('getTransaction function', () => {
    it('should calls handlers.getTransaction with mockRequest.params.id', () => {
      transactionsRouter.getTransaction(mockRequest, mockResponse);
      expect(handlers.getTransaction).toBeCalledWith(mockRequest.params.id);
    });

    it('should calls mockResponse.json with mockTransaction', () => {
      transactionsRouter.getTransaction(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockTransaction);
    });

    it('should calls mockResponse.sendStatus with 404', () => {
      handlers.getTransaction.mockImplementationOnce(() => null);
      transactionsRouter.getTransaction(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(404);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getTransaction.mockImplementationOnce(() => undefined);
      transactionsRouter.getTransaction(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });

  describe('getTransactions function', () => {
    it('should calls handlers.getTransactions', () => {
      transactionsRouter.getTransactions(mockRequest, mockResponse);
      expect(handlers.getTransactions).toBeCalled();
    });

    it('should calls mockResponse.json with [mockTransaction]', () => {
      transactionsRouter.getTransactions(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith([mockTransaction]);
    });

    it('should calls mockResponse.sendStatus with 500', () => {
      handlers.getTransactions.mockImplementationOnce(() => undefined);
      transactionsRouter.getTransactions(mockRequest, mockResponse);
      expect(mockResponse.sendStatus).toBeCalledWith(500);
    });
  });
});

const handlers = require('../transactions');
const { modelTransaction } = require('../../models');
const { modelUserTransaction } = require('../../models');

const mockTransactionId = 1;

jest.mock('../../models', () => ({
  modelTransaction: {
    create: jest.fn(data => Promise.resolve({ ...data, id: mockTransactionId })),
    findAll: jest.fn(data => Promise.resolve(data)),
  },
  modelUserTransaction: {
    create: jest.fn(() => Promise.resolve(
      { get: () => ({ transactionId: mockTransactionId }) },
    )),
  },
}));


const mockParam = {
  title: 'test',
  cost: 5,
  payerId: 1,
  participantsId: [1, 2, 3],
};

describe('Test createTransaction handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls modelTransaction.create with proper parameter', () =>
    handlers.createTransaction(mockParam).then(() =>
      expect(modelTransaction.create).toBeCalledWith({
        title: mockParam.title,
        cost: mockParam.cost,
        payerId: mockParam.payerId,
      }),
    ),
  );

  it('should calls modelUserTransaction.create three times with proper parameter', () =>
    handlers.createTransaction(mockParam).then(() => {
      expect(modelUserTransaction.create).toHaveBeenCalledTimes(mockParam.participantsId.length);
      expect(modelUserTransaction.create).toBeCalledWith({
        userId: mockParam.participantsId.pop(),
        transactionId: mockTransactionId,
      });
    }),
  );

  it('should calls modelTransaction.findAll with proper parameter', () =>
    handlers.createTransaction(mockParam).then(() => {
      expect(modelTransaction.findAll).toBeCalledWith({
        where: { id: mockTransactionId },
        include: [{
          model: modelUserTransaction,
          as: 'participantsId',
          attributes: ['userId'],
        }],
      });
    }),
  );
});

describe('Test getTransactions handler', () => {
  it('should calls modelTransaction.findAll with proper parameter', () =>
    handlers.getTransactions(mockParam).then(() => {
      expect(modelTransaction.findAll).toBeCalledWith({
        include: [{
          model: modelUserTransaction,
          as: 'participantsId',
          attributes: ['userId'],
        }],
      });
    }),
  );
});


const handlers = require('../transactions');
const { modelTransaction } = require('../../models');
const { modelUser } = require('../../models');

const mockTransactionId = 1;
const mockAddUsers = jest.fn(() => [[{
  get: jest.fn(() => ({ transactionId: mockTransactionId })),
}]]);
const mockParam = {
  title: 'test',
  cost: 5,
  payerId: 1,
  participantsId: [1, 2, 3],
};

jest.mock('../../models', () => ({
  modelTransaction: {
    create: jest.fn(data => Promise.resolve({
      ...data,
      id: mockTransactionId,
      addUsers: mockAddUsers,
    })),
    findAll: jest.fn(data => Promise.resolve([{
      ...data,
      get: jest.fn(() => ({ users: [{ id: 1 }] })),
    }])),
  },
}));

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

  it('should calls addUsers with proper parameter', () =>
    handlers.createTransaction(mockParam).then(() => {
      expect(mockAddUsers).toBeCalledWith(mockParam.participantsId);
    }),
  );
});

describe('Test getTransactions handler', () => {
  it('should calls modelTransaction.findAll with proper parameter', () =>
    handlers.getTransactions(mockParam).then(() => {
      expect(modelTransaction.findAll).toBeCalledWith({
        attributes: ['id', 'title', 'cost', 'payerId'],
        include: [{ model: modelUser }],
      });
    }),
  );
});


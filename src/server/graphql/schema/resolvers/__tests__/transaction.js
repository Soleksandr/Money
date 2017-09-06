const resolvers = require('../transaction');
const { modelTransaction } = require('../../../../models');
const { modelUser } = require('../../../../models');

const mockTransactionId = 1;

const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockUser3 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 3,
};

const mockTransactions = [
  {
    title: 'test1',
    cost: '1',
    payer: mockUser1,
    participants: [mockUser1, mockUser3],
    id: 1,
  },
  {
    title: 'test2',
    cost: '2',
    payer: mockUser3,
    participants: [mockUser2, mockUser3],
    id: 2,
  },
];

const mockAddParticipants = jest.fn(() => [[{
  get: jest.fn(() => ({ transactionId: mockTransactionId })),
}]]);

const mockParam = {
  title: 'test',
  cost: 5,
  payerId: 1,
  participantsId: [1, 2, 3],
};

const mockRequest = {
  passport: {
    user: {
      id: 1,
      name: 'Ivan',
      surname: 'Ivanov',
      username: 'ivan',
    },
  },
};

jest.mock('../../../../models', () => ({
  modelTransaction: {
    create: jest.fn(() => Promise.resolve({
      addParticipants: mockAddParticipants,
    })),
    findOne: jest.fn(data => Promise.resolve(data)),
    findAll: jest.fn(() => Promise.resolve(
      mockTransactions,
    )),
  },
  modelUser: {
    findAll: jest.fn(data => Promise.resolve(data)),
  },
}));

describe('Test createTransaction resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls modelTransaction.create with proper parameter', () =>
   resolvers.Mutation.createTransaction(null, mockParam).then(() =>
      expect(modelTransaction.create).toBeCalledWith({
        title: mockParam.title,
        cost: mockParam.cost,
        payerId: mockParam.payerId,
      }),
    ),
  );

  it('should calls mockAddParticipants with proper parameter', () =>
    resolvers.Mutation.createTransaction(null, mockParam).then(() => {
      expect(mockAddParticipants).toBeCalledWith(mockParam.participantsId);
    }),
  );

  it('should calls modelTransaction.findOne with proper parameter', () =>
    resolvers.Mutation.createTransaction(null, mockParam).then(() => {
      expect(modelTransaction.findOne).toBeCalledWith({
        where: {
          id: mockTransactionId,
        },
        attributes: ['id', 'title', 'cost'],
        include: [
          { model: modelUser,
            as: 'participants',
            attributes: ['id', 'name', 'surname', 'username'],
            through: {
              attributes: [],
            },
          },
          { model: modelUser,
            as: 'payer',
            attributes: ['id', 'name', 'surname', 'username'],
          },
        ],
      });
    }),
  );
});

describe('Test getTransactions resolver', () => {
  it('should calls modelTransaction.findAll with proper parameter', () =>
    resolvers.Query.getTransactions(mockRequest).then(() => {
      expect(modelTransaction.findAll).toBeCalledWith({
        attributes: ['id', 'title', 'cost', 'payerId'],
        include: [
          { model: modelUser,
            as: 'participants',
            attributes: ['id', 'name', 'surname', 'username'],
            through: {
              attributes: [],
            },
          },
          { model: modelUser,
            as: 'payer',
            attributes: ['id', 'name', 'surname', 'username'],
          },
        ],
      });
    }),
  );

  it('should return proper data when user is loged in', () =>
    resolvers.Query.getTransactions(mockRequest).then().then((transactions) => {
      expect(transactions).toEqual([mockTransactions[0]]);
    }),
  );

  it('should return proper data when user is not loged in', () => {
    expect(resolvers.Query.getTransactions({ passport: { user: null } })).toEqual([]);
  });
});

const resolvers = require('../resolvers');
const { modelTransaction } = require('../../../models');
const { modelUser } = require('../../../models');

const mockTransactionId = 1;
const mockParticipantsHandler = jest.fn((arr, data) => arr.push(data));

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

const mockUsers = [mockUser1, mockUser2, mockUser3];


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

const mockQueryHandler = jest.fn((data) => {
  if (data.passport.user.id) {
    return Promise.resolve([
      {
        title: 'test1',
        cost: '1',
        payer: mockUser1,
        participants: [{ dataValues: mockUser2 }],
        id: 1,
      },
    ]);
  }
  return null;
});

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

jest.mock('../../../models', () => ({
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

describe('getUsers resolver', () => {
  it('should calls modelUser.findAll with proper arguments', () =>
    resolvers.Query.getUsers().then(() =>
      expect(modelUser.findAll).toBeCalledWith({
        attributes: ['id', 'username', 'name', 'surname'],
      }),
    ),
  );
});

describe('getParticipants resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls mockQueryHandler when user is loged in', () => {
    resolvers.getParticipantsPureFunc(mockQueryHandler, mockParticipantsHandler)(mockRequest);
    expect(mockQueryHandler).toBeCalled();
  });

  it('should calls mockParticipansHandler when user is loged in', () =>
    resolvers.getParticipantsPureFunc(mockQueryHandler, mockParticipantsHandler)(mockRequest).then(() =>
    expect(mockParticipantsHandler).toBeCalled(),
  ));

  it('should return proper data when user is loged in', () =>
    resolvers.getParticipantsPureFunc(mockQueryHandler, mockParticipantsHandler)(mockRequest).then((data) =>
    expect(data).toEqual([mockUser2]),
  ));

  it('should return proper data when user is not loged in', () => {
    expect(resolvers.getParticipantsPureFunc(mockQueryHandler, mockParticipantsHandler)({ passport: { user: null } })).toEqual([]);
  });


  //   it('should calls mockResponse.json with proper argument', () =>
  //     usersRouter.getParticipants(mockRequest, mockResponse).then(() =>
  //       expect(mockResponse.json).toBeCalledWith([mockUsers[1]]),
  //     ),
  //   );

  //   it('should calls mockResponse.sendStatus with 500', () => {
  //     transactionsHandler.getTransactions.mockImplementationOnce(() => Promise.resolve(null));
  //     return usersRouter.getParticipants(mockRequest, mockResponse).then(() =>
  //       expect(mockResponse.sendStatus).toBeCalledWith(500),
  //     );
  //   });

  //   it('usersRouter.getParticipantsPureFunc should return an object', () => {
  //     expect(usersRouter.getParticipantsPureFunc()).toEqual(expect.any(Function));
  //   });

  //   it('mockParticipantsHandler should be called', () =>
  //     usersRouter.getParticipantsPureFunc(mockParticipantsHandler)(mockRequest, mockResponse).then(() =>
  //       expect(mockParticipantsHandler).toBeCalled(),
  //     ),
  //   );

  //   it('mockParticipantsHandler should be called with proper arguments', () =>
  //     usersRouter.getParticipantsPureFunc(mockParticipantsHandler)(mockRequest, mockResponse).then(() =>
  //       expect(mockParticipantsHandler).toBeCalledWith([], mockUsers[0], mockRequest.user.id),
  //     ),
  //   )
});

const resolvers = require('../user');
const bcrypt = require('bcrypt');
const { getTransactions } = require('../transaction').Query;
const { modelUser } = require('../../../../models');

const mockUser = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  password: 'password',
};

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

const mockTransactions = [
  {
    title: 'test1',
    cost: '100',
    payer: mockUser1,
    participants: [
      { dataValues: mockUser1 },
      { dataValues: mockUser2 },
    ],
    id: 1,
  },
];

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

const mockHash = 'hash';

jest.mock('../../../../models', () => ({
  modelUser: {
    findAll: jest.fn(data => Promise.resolve(data)),
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve(mockHash)),
}));

jest.mock('../transaction', () => ({
  Query: {
    getTransactions: jest.fn(() => Promise.resolve(mockTransactions)),
  },
}));

describe('Test getUsers resolver', () => {
  it('should calls modelUser.findAll with proper arguments', () =>
    resolvers.Query.getUsers().then(() =>
      expect(modelUser.findAll).toBeCalledWith({
        attributes: ['id', 'username', 'name', 'surname'],
      }),
    ),
  );
});

describe('Test getParticipants resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls getTransactions resolver with proper arguments when user is loged in', () =>
    resolvers.Query.getParticipants(mockRequest).then(() =>
    expect(getTransactions).toBeCalledWith(mockRequest),
  ));

  it('should not calls getTransactions resolver when user is not loged in', () => {
    resolvers.Query.getParticipants({ passport: { user: null } });
    expect(getTransactions).not.toBeCalled();
  });

  it('should return proper data when user is loged in', () => {
    const data = resolvers.Query.getParticipants(mockRequest);
    data.then(res => expect(res).toEqual([{ ...mockUser2, money: '50.00' }]));
  });

  it('should return proper data when user is not loged in', () => {
    const data = resolvers.Query.getParticipants({ passport: { user: null } });
    expect(data).toEqual([]);
  });
});

describe('Test createUser resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls bcrypt.hash with proper arguments', () =>
    resolvers.Mutation.createUser(null, mockUser).then(() =>
    expect(bcrypt.hash).toBeCalledWith(mockUser.password, expect.any(Number)),
  ));

  it('should calls modelUser.createUser with proper arguments', () =>
    resolvers.Mutation.createUser(null, mockUser).then(() =>
    expect(modelUser.create).toBeCalledWith({ ...mockUser, password: mockHash }),
  ));
});

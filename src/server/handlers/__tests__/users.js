const handlers = require('../users');
const db = require('../../db');
const validator = require('../../utils/validator');

jest.mock('../../db', () => ({
  User: jest.fn(() => ({ id: 2 })),
  users: [{ id: 1 }],
  transactions: [{ participantsId: [1, 2], payerId: 2, id: 1 }],
}));

jest.mock('../../utils/validator', () => ({
  validateOnEmptiness: jest.fn(param =>
    param === 'correct',
  ),
}));

const mockGetUser = jest.fn(id => id === 1);
const mockId = 1;


describe('Test createUser handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls validateOnEmptiness and calls db.User with proper arguments', () => {
    const mockArgument = 'correct';
    handlers.createUser(mockArgument);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockArgument);
    expect(db.User).toBeCalledWith(mockArgument);
  });

  it('should calls validateOnEmptiness with proper argument and does not call db.User', () => {
    const mockArgument = 'incorrect';
    handlers.createUser(mockArgument);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockArgument);
    expect(db.User).not.toBeCalled();
  });

  it('should return mockUser with correct argument', () => {
    const mockArgument = 'correct';
    const result = handlers.createUser(mockArgument);
    expect(result).toEqual(db.User());
  });

  it('should return null with incorrect argument', () => {
    const mockArgument = 'incorrect';
    const result = handlers.createUser(mockArgument);
    expect(result).toBe(null);
  });
});

describe('Test getUsers handler', () => {
  it('should return an array', () => {
    expect(handlers.getUsers()).toBeInstanceOf(Array);
  });
});

describe('Test getUser handler', () => {
  it('should return user when argument is correct', () => {
    const correctParameter = db.users[0].id;
    expect(handlers.getUser(correctParameter)).toEqual(db.users[0]);
  });

  it('should return null when argument is incorrect', () => {
    const incorrectParameter = 100;
    expect(handlers.getUser(incorrectParameter)).toBe(null);
  });
});

describe('Test getUserTransactions', () => {
  it('should return a function', () => {
    expect(typeof handlers.getUserTransactionsPureFn()).toBe('function');
  });

  it('should return proper transactions', () => {
    const result = handlers.getUserTransactionsPureFn(mockGetUser)(mockId);
    expect(result).toEqual(db.transactions);
  });

  it('should return null', () => {
    expect(handlers.getUserTransactionsPureFn(mockGetUser)(100)).toBe(null);
  });
});

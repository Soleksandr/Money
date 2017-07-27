const handlers = require('../users');
const db = require('../../db');
const validator = require('../../utils/validator');

jest.mock('../../db', () => ({
  User: jest.fn(() => ({ id: 2 })),
  users: [{ id: 1 }],
  transactions: [{ participantsId: [1, 2], payerId: 2 }],
}));

describe('Test createUser handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call validateOnEmptiness and db.User  with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    handlers.createUser(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.User).toBeCalledWith(mockParameter);
  });

  it('should call validateOnEmptiness and does not call db.User  with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    handlers.createUser(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.User).not.toBeCalled();
  });

  it('should return mockUser with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    const result = handlers.createUser(mockParameter);
    expect(result).toEqual(db.User());
  });

  it('should return null with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    const result = handlers.createUser(mockParameter);
    expect(result).toBe(null);
  });
});

describe('Test getUsers handler', () => {
  it('should return an array', () => {
    expect(handlers.getUsers()).toBeInstanceOf(Array);
  });
});

describe('Test getUser handler', () => {
  it('should return user with correct parameter', () => {
    const correctParameter = db.users[0].id;
    expect(handlers.getUser(correctParameter)).toEqual(db.users[0]);
  });

  it('should return null with incorrect parameter', () => {
    const incorrectParameter = 100;
    expect(handlers.getUser(incorrectParameter)).toBe(null);
  });
});

describe('Test getTransactionsOfUser handler', () => {
  it('should call getUser with correct parameter', () => {
    const correctParameter = 'correct';
    const mockGetUserFn = jest.fn();
    const getTransactionsOfUser = handlers.getTransactionsOfUserPureFn(mockGetUserFn);
    getTransactionsOfUser(correctParameter);
    expect(mockGetUserFn).toBeCalledWith(correctParameter);
  });

  it('should call getUser with incorrect parameter', () => {
    const incorrectParameter = 'incorrect';
    const mockGetUserFn = jest.fn();
    const getTransactionsOfUser = handlers.getTransactionsOfUserPureFn(mockGetUserFn);
    getTransactionsOfUser(incorrectParameter);
    expect(mockGetUserFn).toBeCalledWith(incorrectParameter);
  });

  it('with correct parameter should return an array that contains transaction', () => {
    const correctParameter = db.users[0].id;
    const result = handlers.getTransactionsOfUser(correctParameter);
    expect(result.length).not.toBe(0);
  });

  it('with incorrect parameter should return null', () => {
    const incorrectParameter = 100;
    const result = handlers.getTransactionsOfUser(incorrectParameter);
    expect(result).toBe(null);
  });
});

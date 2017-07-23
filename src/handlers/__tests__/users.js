const handlers = require('../users');
const db = require('../../db');
const config = require('../../test_config');

describe('Test addUser handler', () => {
  it('should return instance of User class', () => {
    expect(handlers.createUser(config.correctUser)).toBeInstanceOf(db.User);
  });
  it('should add new user to db', () => {
    const instance = handlers.createUser(config.correctUser);
    expect(db.users.find(item => instance === item)).toBeTruthy();
  });
  it('should set unique id', () => {
    const instance1 = handlers.createUser(config.correctUser);
    const instance2 = handlers.createUser(config.correctUser);
    expect(instance1.id !== instance2.id).toBeTruthy();
  });
  it('should return null when parameter contain property with empty value', () => {
    expect(handlers.createUser(config.emptyName)).toBe(null);
  });
});

describe('Test getUsers handler', () => {
  it('should return an array', () => {
    expect(handlers.getUsers()).toBeInstanceOf(Array);
  });
});

describe('Test getTransactionsOfUser handler', () => {
  beforeEach(() => {
    config.initDb();
  });

  afterEach(() => {
    config.clearDb();
  });

  it('should return an array', () => {
    expect(handlers.getUsers()).toBeInstanceOf(Array);
  });
  it('user with id 1 should has two transactions only', () => {
    const transactions = handlers.getTransactionsOfUser(1);
    expect(transactions.length).toBe(2);
  });
  it('transactions id for user with id 1 should be 1 and 2', () => {
    const transactions = handlers.getTransactionsOfUser(1);
    transactions.forEach((item) => {
      expect(item.id === 1 || item.id === 2).toBeTruthy();
    });
  });
});

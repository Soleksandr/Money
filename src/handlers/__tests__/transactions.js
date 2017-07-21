const handlers = require('../transactions');
const db = require('../../db');
const config = require('../../test_config');

describe('Test addTransaction handler', () => {
  it('should return instance of Transaction class', () => {
    expect(handlers.createTransaction(config.correctTransaction)).toBeInstanceOf(db.Transaction);
  });
  it('should add new transaction to db', () => {
    const instance = handlers.createTransaction(config.correctTransaction);
    expect(db.transactions.find(item => instance === item)).toBeTruthy();
  });
  it('should set unique id', () => {
    const instance1 = handlers.createTransaction(config.correctTransaction);
    const instance2 = handlers.createTransaction(config.correctTransaction);
    expect(instance1.id !== instance2.id).toBeTruthy();
  });
  it('should return null when parameter contain property with empty value', () => {
    expect(handlers.createTransaction(config.emptyTitle)).toBe(null);
  });
});

describe('Test getTransactions handler', () => {
  it('should return an array', () => {
    expect(handlers.getTransactions()).toBeInstanceOf(Array);
  });
});

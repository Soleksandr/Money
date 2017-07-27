const handlers = require('../transactions');
const validator = require('../../utils/validator');
const db = require('../../db');

const mockTransaction = {
  value: 'test',
};

jest.mock('../../db', () => ({
  Transaction: jest.fn(() => mockTransaction),
}));

describe('Test createTransaction handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call validateOnEmptiness and db.Transaction  with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    handlers.createTransaction(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.Transaction).toBeCalledWith(mockParameter);
  });

  it('should call validateOnEmptiness and does not call db.Transaction  with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    handlers.createTransaction(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.Transaction).not.toBeCalled();
  });

  it('should return mockTransaction with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    const result = handlers.createTransaction(mockParameter);
    expect(result).toBe(db.Transaction());
  });

  it('should return null with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    const result = handlers.createTransaction(mockParameter);
    expect(result).toBe(null);
  });
});
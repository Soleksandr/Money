const handlers = require('../users');
const db = require('../../db');
const validator = require('../../utils/validator');

describe('Test createTransaction handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call validateOnEmptiness and db.User  with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    handlers.createTransaction(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.User).toBeCalledWith(mockParameter);
  });

  it('should call validateOnEmptiness and does not call db.User  with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    handlers.createTransaction(mockParameter);
    expect(validator.validateOnEmptiness).toBeCalledWith(mockParameter);
    expect(db.User).not.toBeCalled();
  });

  it('should return mockTransaction with correct parameter', () => {
    const mockParameter = 'correct';
    validator.validateOnEmptiness = jest.fn(() => true);
    const result = handlers.createTransaction(mockParameter);
    expect(result).toBe(db.User());
  });

  it('should return null with incorrect parameter', () => {
    const mockParameter = 'incorrect';
    validator.validateOnEmptiness = jest.fn(() => false);
    const result = handlers.createTransaction(mockParameter);
    expect(result).toBe(null);
  });
});



// describe('Test addUser handler', () => {
//   it('should return instance of User class', () => {
//     expect(handlers.createUser(config.correctUser)).toBeInstanceOf(db.User);
//   });
//   it('should add new user to db', () => {
//     const instance = handlers.createUser(config.correctUser);
//     expect(db.users.find(item => instance === item)).toBeTruthy();
//   });
//   it('should set unique id', () => {
//     const instance1 = handlers.createUser(config.correctUser);
//     const instance2 = handlers.createUser(config.correctUser);
//     expect(instance1.id !== instance2.id).toBeTruthy();
//   });
//   it('should return null when parameter contain property with empty value', () => {
//     expect(handlers.createUser(config.emptyName)).toBe(null);
//   });
// });

// describe('Test getUsers handler', () => {
//   it('should return an array', () => {
//     expect(handlers.getUsers()).toBeInstanceOf(Array);
//   });
// });

// describe('Test getTransactionsOfUser handler', () => {
//   beforeEach(() => {
//     config.initDb();
//   });

//   afterEach(() => {
//     config.clearDb();
//   });

//   it('should return an array', () => {
//     expect(handlers.getUsers()).toBeInstanceOf(Array);
//   });
//   it('user should has all transactions where he is a payer', () => {
//     const userId = 1;
//     const transactions = handlers.getTransactionsOfUser(userId);
//     const asPayer = transactions.filter(item => item.payerId === 1);
//     expect(asPayer.length).toBe(2);
//   });
//   it('users should has all transactions where he is a participant', () => {
//     const userId = 1;
//     const transactions = handlers.getTransactionsOfUser(userId);
//     const asParticipant = transactions.filter(item =>
//       item.participantsId.find(id => id === userId));
//     expect(asParticipant.length).toBe(2);
//   });
// });

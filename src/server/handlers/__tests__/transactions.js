// const handlers = require('../transactions');
// const db = require('../../db');
// const validator = require('../../utils/validator');

// jest.mock('../../db', () => ({
//   Transaction: jest.fn(() => ({ participantsId: [1, 2], payerId: 2, id: 1 })),
//   users: [{ id: 1 }],
//   transactions: [{ participantsId: [1, 2], payerId: 2, id: 1 }],
// }));

// jest.mock('../../utils/validator', () => ({
//   validateOnEmptiness: jest.fn(param =>
//     param === 'correct',
//   ),
// }));

// describe('Test createTransaction handler', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should calls validateOnEmptiness and calls db.Transaction with proper arguments', () => {
//     const mockArgument = 'correct';
//     handlers.createTransaction(mockArgument);
//     expect(validator.validateOnEmptiness).toBeCalledWith(mockArgument);
//     expect(db.Transaction).toBeCalledWith(mockArgument);
//   });

//   it('should calls validateOnEmptiness with proper argument and does not call db.Transaction', () => {
//     const mockArgument = 'incorrect';
//     handlers.createTransaction(mockArgument);
//     expect(validator.validateOnEmptiness).toBeCalledWith(mockArgument);
//     expect(db.Transaction).not.toBeCalled();
//   });

//   it('should return mockTransaction with correct argument', () => {
//     const mockArgument = 'correct';
//     const result = handlers.createTransaction(mockArgument);
//     expect(result).toEqual(db.Transaction());
//   });

//   it('should return null with incorrect argument', () => {
//     const mockArgument = 'incorrect';
//     const result = handlers.createTransaction(mockArgument);
//     expect(result).toBe(null);
//   });
// });

// describe('Test getTransactions handler', () => {
//   it('should return an array', () => {
//     expect(handlers.getTransactions()).toBeInstanceOf(Array);
//   });
// });

// describe('Test getTransaction handler', () => {
//   it('should return transaction when argument is correct', () => {
//     const correctParameter = db.transactions[0].id;
//     expect(handlers.getTransaction(correctParameter)).toEqual(db.transactions[0]);
//   });

//   it('should return null when argument is incorrect', () => {
//     const incorrectParameter = 100;
//     expect(handlers.getTransaction(incorrectParameter)).toBe(null);
//   });
// });

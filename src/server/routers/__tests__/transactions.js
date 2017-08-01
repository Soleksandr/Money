const request = require('supertest');
const transactions = require('../transactions');
const handlers = require('../../handlers/transactions');
const app = require('../../app');

const mockTransaction = {
  title: 'test',
  cost: 100,
  payerId: 1,
  participantsId: [1, 2, 3],
  id: 1,
};

const mockData = {
  title: 'test',
  cost: 100,
  payerId: 1,
  participantsId: [1, 2, 3],
};

jest.mock('../../handlers/transactions', () => ({
  createTransaction: jest.fn(),
  getTransactions: jest.fn(),
}));

describe('Test post /transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls handlers.createTransaction with mockData parameter', () =>
    request(app).post('/transactions').then(() =>
      expect(handlers.createTransaction).toHaveBeenCalledWith('mockData'),
    ),
  );

//   it('json method of res param should be called with mockTransaction', () => {
//     handlers.createTransaction.mockImplementationOnce(() => mockTransaction);
//     transactions(app);
//     expect(res.json).toBeCalled();
//     expect(res.json).toHaveBeenCalledWith(mockTransaction);
//   });

//   it('should calls sendStatus with 400 and should not calls json method of res when transaction value is null', () => {
//     handlers.createTransaction.mockImplementationOnce(() => null);
//     transactions(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(400);
//   });

//   it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
//     handlers.createTransaction.mockImplementationOnce(() => undefined);
//     transactions(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(500);
//   });
// });

// describe('Test get /transactions', () => {
//   app.get = jest.fn((route, callback) => {
//     callback(req, res);
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should calls get method with first argument "/transactions" and second any function', () => {
//     transactions(app);
//     expect(app.get).toHaveBeenCalledWith('/transactions', expect.any(Function));
//   });

//   it('should calls handlers.getTransactions', () => {
//     transactions(app);
//     expect(handlers.getTransactions).toBeCalled();
//   });

//   it('json method of res param should be called with correct transaction value', () => {
//     handlers.getTransactions.mockImplementationOnce(() => [mockTransaction]);
//     transactions(app);
//     expect(res.json).toBeCalled();
//     expect(res.json).toHaveBeenCalledWith([mockTransaction]);
//   });

//   it('should calls sendStatus with 500 and should not calls json method of res when transaction value incorrect', () => {
//     handlers.getTransactions.mockImplementationOnce(() => undefined);
//     transactions(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(500);
//   });
});

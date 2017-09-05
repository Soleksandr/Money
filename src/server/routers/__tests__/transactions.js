// const transactionsRouter = require('../transactions');
// const handlers = require('../../handlers/transactions');


// const mockUser1 = {
//   username: 'ivan',
//   name: 'Ivan',
//   surname: 'Ivanov',
//   id: 1,
// };

// const mockUser2 = {
//   username: 'petr',
//   name: 'Petr',
//   surname: 'Petrov',
//   id: 2,
// };

// const mockUser3 = {
//   username: 'petr',
//   name: 'Petr',
//   surname: 'Petrov',
//   id: 3,
// };

// const mockTransactions = [
//   {
//     title: 'test1',
//     cost: '1',
//     payer: mockUser1,
//     participants: [mockUser1, mockUser3],
//     id: 1,
//   },
//   {
//     title: 'test2',
//     cost: '2',
//     payer: mockUser3,
//     participants: [mockUser2, mockUser3],
//     id: 2,
//   },
// ];

// const mockRequest = {
//   user: {
//     id: 1,
//   },
// };

// const mockResponse = {
//   json: jest.fn(),
//   sendStatus: jest.fn(),
// };

// jest.mock('../../handlers/transactions', () => ({
//   createTransaction: jest.fn(() => Promise.resolve(mockTransactions[0])),
//   getTransactions: jest.fn(() => Promise.resolve(mockTransactions)),
// }));

// describe('Test transactions router', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('createTransaction function', () => {
//     it('should calls handlers.createTransaction with mockRequest.body', () =>
//       transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
//         expect(handlers.createTransaction).toBeCalledWith(mockRequest.body),
//       ),
//     );

//     it('should calls mockResponse.json with proper argument ', () =>
//       transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
//         expect(mockResponse.json).toBeCalledWith(mockTransactions[0]),
//       ),
//     );

//     it('should calls mockResponse.sendStatus with 500', () => {
//       handlers.createTransaction.mockImplementationOnce(() => Promise.resolve(null));
//       return transactionsRouter.createTransaction(mockRequest, mockResponse).then(() =>
//         expect(mockResponse.sendStatus).toBeCalledWith(500),
//       );
//     });
//   });


//   describe('getTransactions function', () => {
//     it('should calls handlers.getTransactions', () =>
//       transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
//         expect(handlers.getTransactions).toBeCalled(),
//       ),
//     );

//     it('should calls mockResponse.json with proper argument', () =>
//       transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
//         expect(mockResponse.json).toBeCalledWith([mockTransactions[0]]),
//       ),
//     );

//     it('should calls mockResponse.sendStatus with 500', () => {
//       handlers.getTransactions.mockImplementationOnce(() => Promise.resolve(null));
//       return transactionsRouter.getTransactions(mockRequest, mockResponse).then(() =>
//         expect(mockResponse.sendStatus).toBeCalledWith(500),
//       );
//     });
//   });
// });

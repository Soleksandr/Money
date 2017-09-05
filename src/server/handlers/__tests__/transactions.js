// const handlers = require('../transactions');
// const { modelTransaction } = require('../../models');
// const { modelUser } = require('../../models');

// const mockTransactionId = 1;

// const mockAddParticipants = jest.fn(() => [[{
//   get: jest.fn(() => ({ transactionId: mockTransactionId })),
// }]]);

// const mockParam = {
//   title: 'test',
//   cost: 5,
//   payerId: 1,
//   participantsId: [1, 2, 3],
// };

// jest.mock('../../models', () => ({
//   modelTransaction: {
//     create: jest.fn(data => Promise.resolve({
//       ...data,
//       id: mockTransactionId,
//       addParticipants: mockAddParticipants,
//     })),
//     findOne: jest.fn(data => Promise.resolve({
//       ...data,
//       get: jest.fn(() => ({ participantsId: [{ id: 1 }] })),
//     })),
//     findAll: jest.fn(data => Promise.resolve([{
//       ...data,
//       get: jest.fn(() => ({ participantsId: [{ id: 1 }] })),
//     }])),
//   },
// }));

// describe('Test createTransaction handler', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should calls modelTransaction.create with proper parameter', () =>
//     handlers.createTransaction(mockParam).then(() =>
//       expect(modelTransaction.create).toBeCalledWith({
//         title: mockParam.title,
//         cost: mockParam.cost,
//         payerId: mockParam.payerId,
//       }),
//     ),
//   );

//   it('should calls mockAddParticipants with proper parameter', () =>
//     handlers.createTransaction(mockParam).then(() => {
//       expect(mockAddParticipants).toBeCalledWith(mockParam.participantsId);
//     }),
//   );

//   it('should calls modelTransaction.findOne with proper parameter', () =>
//     handlers.createTransaction(mockParam).then((result) => {
//       expect(modelTransaction.findOne).toBeCalledWith({
//         where: {
//           id: mockTransactionId,
//         },
//         attributes: ['id', 'title', 'cost'],
//         include: [
//           { model: modelUser,
//             as: 'participants',
//             attributes: ['id', 'name', 'surname', 'username'],
//             through: {
//               attributes: [],
//             },
//           },
//           { model: modelUser,
//             as: 'payer',
//             attributes: ['id', 'name', 'surname', 'username'],
//           },
//         ],
//       });
//     }),
//   );
// });

// describe('Test getTransactions handler', () => {
//   it('should calls modelTransaction.findAll with proper parameter', () =>
//     handlers.getTransactions(mockParam).then(() => {
//       expect(modelTransaction.findAll).toBeCalledWith({
//         attributes: ['id', 'title', 'cost'],
//         include: [
//           { model: modelUser,
//             as: 'participants',
//             attributes: ['id', 'name', 'surname', 'username'],
//             through: {
//               attributes: [],
//             },
//           },
//           { model: modelUser,
//             as: 'payer',
//             attributes: ['id', 'name', 'surname', 'username'],
//           },
//         ],
//       });
//     }),
//   );
// });

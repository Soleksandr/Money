// jest.mock('../../db');
// jest.mock('../../utils/validator');


// const user1 = {
//   name: 'Ivan',
//   surname: 'Ivanov',
// };

// const transaction1 = {
//   title: 'goods',
//   cost: 10,
//   payerId: 1,
//   participantsId: [1, 2, 3],
// };

// const transactionNoTitle = {
//   title: '',
//   cost: 10,
//   payerId: 2,
//   participantsId: [1, 2, 3],
// };

// const mockDb = {
//   Transaction: jest.mock.fn(() => user1),
//   transactions: [transaction1],
// };

// const mockValidate

// module.exports = {
//   user1,
//   transaction1,
//   transactionNoTitle,
//   mockDb,
// };

// // const correctTransaction = {
// //   title: 'goods',
// //   cost: 10,
// //   payerId: 1,
// //   participantsId: [1, 2, 3],
// // };

// // const emptyTitle = {
// //   title: '',
// //   cost: 10,
// //   payerId: 2,
// //   participantsId: [1, 2, 3],
// // };

// // const correctUser = {
// //   name: 'Ivan',
// //   surname: 'Ivanov',
// // };

// // const emptyName = {
// //   name: '',
// //   surname: 'Ivanov',
// // };

// // // user id 1:
// // //    payer: transaction id 1, transaction id 2
// // //    participant: transaction id 2, transaction id 3
// // // user id 2:
// // //    payer: transaction id 2,
// // //    participant: transaction id 1, transaction id 2
// // // user id 3:
// // //    payer: no,
// // //    participant: transaction id 1, transaction id 2
// // // user id 4:
// // //    payer: no,
// // //    participant: no

// // const initDb = () => {
// //   db.users = [
// //     {
// //       name: 'Ivan',
// //       surname: 'Ivanov',
// //       id: 1,
// //     },
// //     {
// //       name: 'Petr',
// //       surname: 'Petrov',
// //       id: 2,
// //     },
// //     {
// //       name: 'Vasily',
// //       surname: 'Vasichkin',
// //       id: 3,
// //     },
// //     {
// //       name: 'Sergy',
// //       surname: 'Sergeev',
// //       id: 4,
// //     },
// //   ];

// //   db.transactions = [
// //     {
// //       title: 'goods',
// //       cost: 10,
// //       participantsId: [2, 3],
// //       payerId: 1,
// //       id: 1,
// //     },
// //     {
// //       title: 'cloths',
// //       cost: 50,
// //       participantsId: [1, 2, 3],
// //       payerId: 1,
// //       id: 2,
// //     },
// //     {
// //       title: 'traveling',
// //       cost: 100,
// //       participantsId: [1, 2, 3],
// //       payerId: 2,
// //       id: 3,
// //     },
// //     {
// //       title: 'somethig else',
// //       cost: 500,
// //       participantsId: [2, 3],
// //       payerId: 2,
// //       id: 4,
// //     },
// //   ];
// // };

// // const clearDb = () => {
// //   db.users = [];
// //   db.transactions = [];
// // };


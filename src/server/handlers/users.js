// const db = require('../db');
// const validator = require('../utils/validator');
const model = require('../models').users;

const createUser = data =>
  model.create({
    name: data.name,
    surname: data.surname,
  });

const getUsers = () => model.findAll();

// const getUser = id => db.users.find(user => user.id === id) || null;

// const getUserTransactions = getUserFn => (id) => {
//   if (getUserFn(id)) {
//     const transactions = db.transactions.filter(
//       transaction => transaction.participantsId.find(
//         participantId => participantId === id) || transaction.payerId === id);
//     return transactions;
//   }
//   return null;
// };

module.exports = {
  createUser,
  getUsers,
  // getUserTransactions: getUserTransactions(getUser),
  // getUserTransactionsPureFn: getUserTransactions,
  // getUser,
};

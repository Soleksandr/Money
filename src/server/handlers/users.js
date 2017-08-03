const db = require('../db');
const validator = require('../utils/validator');

const createUser = (data) => {
  if (validator.validateOnEmptiness(data)) {
    const user = new db.User(data);
    db.users = [...db.users, user];
    return user;
  }
  return null;
};

const getUsers = () => db.users;

const getUser = id => db.users.find(user => user.id === id) || null;

const getUserTransactions = getUserFn => (id) => {
  if (getUserFn(id)) {
    const transactions = db.transactions.filter(
      transaction => transaction.participantsId.find(
        participantId => participantId === id) || transaction.payerId === id);
    return transactions;
  }
  return null;
};

module.exports = {
  createUser,
  getUsers,
  getUserTransactions: getUserTransactions(getUser),
  getUserTransactionsPureFn: getUserTransactions,
  getUser,
};

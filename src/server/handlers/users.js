const db = require('../db');
const validator = require('../utils/validator');

const createUser = data => (
  validator.validateOnEmptiness(data) ? new db.User(data) : null);

const getUsers = () => db.users;

const getUser = id => db.users.find(user => user.id === id) || null;

const getTransactionsOfUser = getUserFn => (id) => {
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
  getTransactionsOfUser: getTransactionsOfUser(getUser),
  getTransactionsOfUserPureFn: getTransactionsOfUser,
  getUser,
};

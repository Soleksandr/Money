const db = require('../db');
const validator = require('../validator');

const createUser = data => (validator.validateOnEmptiness(data) ? new db.User(data) : null);

const getUsers = () => db.users;

const getTransactionsOfUser = (id) => {
  const transactions = db.transactions.filter(
    transaction => transaction.participantsId.find(
      participantId => participantId === id) || transaction.payerId === id);
  return transactions;
};

module.exports = {
  createUser,
  getUsers,
  getTransactionsOfUser,
};

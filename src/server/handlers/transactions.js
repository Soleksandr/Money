const db = require('../db');
const validator = require('../utils/validator');

const createTransaction = data => (
  validator.validateOnEmptiness(data) ? new db.Transaction(data) : null);

const getTransactions = () => db.transactions;

const getTransaction = id => db.users.find(user => user.id === id);

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
};

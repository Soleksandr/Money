const db = require('../db');
const validator = require('../utils/validator');

const createTransaction = data => (
  validator.validateOnEmptiness(data) ? new db.Transaction(data) : null);

const getTransactions = () => db.transactions;

module.exports = {
  createTransaction,
  getTransactions,
};

const db = require('../db');
const validator = require('../utils/validator');

const createTransaction = (data) => {
  if (validator.validateOnEmptiness(data)) {
    const transaction = new db.Transaction(data);
    db.transactions = [...db.transactions, transaction];
    return transaction;
  }
  return null;
};

const getTransactions = () => db.transactions;

const getTransaction = id => db.transactions.find(transaction => transaction.id === id) || null;

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
};

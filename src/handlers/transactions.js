const data = require('../data');

const addTransaction = (req, res) => {
  const transaction = new data.Transaction(req.body);
  data.transactions.push(transaction);
  res.json(transaction);
};

const getTransactions = (req, res) => {
  res.json(data.transactions);
};

module.exports = {
  addTransaction,
  getTransactions,
};

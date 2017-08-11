const db = require('../db');
const validator = require('../utils/validator');
const model = require('../models/transactions');

const createTransaction = data =>
  model.create({
    title: data.title,
    cost: data.cost,
    payer_id: data.payerId,
  });
    // .then(partTransaction =>
      
    // );

const getTransactions = () => model.findAll({
  include: [{
    model: 'usersTransactions',
  }],
});

const getTransaction = id => db.transactions.find(transaction => transaction.id === id) || null;

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
};

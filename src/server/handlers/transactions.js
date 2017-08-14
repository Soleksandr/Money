const db = require('../db');
// const validator = require('../utils/validator');
const { modelTransaction } = require('../models');
const { modelUserTransaction } = require('../models');

const createTransaction = data =>
  modelTransaction.create({
    title: data.title,
    cost: parseInt(data.cost, 10),
    payer_id: data.payerId,
  })
    .then(res => new Promise.all([data.participantsId.map(
      id =>
      modelUserTransaction.create({
        userId: id,
        transactionId: res.id,
      }),
    )]));

const getTransactions = () => modelTransaction.findAll({
  include: [{
    model: modelUserTransaction,
    as: 'participantsId',
  }],
});

const getTransaction = id => db.transactions.find(transaction => transaction.id === id) || null;

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
};

const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const createTransaction = (req, res) =>
  handlers.createTransaction(req.body).then((transaction) => {
    console.log('transaction ========== ', transaction)
    if (transaction) {
      res.json(transaction);
    } else {
      res.sendStatus(500);
    }
  });

const getTransactions = (req, res) =>
  handlers.getTransactions().then((transactions) => {
    if (transactions) {
      const userTransactions = transactions.filter(
        t => t.payerId === req.user || t.participantsId.find(
          id => id === req.user));
      res.json(userTransactions);
    } else {
      res.sendStatus(500);
    }
  });

router.post('/', (req, res) => {
  createTransaction(req, res);
});

router.get('/', (req, res) => {
  getTransactions(req, res);
});

module.exports = {
  router,
  createTransaction,
  getTransactions,
};

const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const createTransaction = (req, res) =>
  handlers.createTransaction(req.body).then((data) => {
    if (data) {
      console.log(data);
      const transaction = data[0].get();
      transaction.participantsId = transaction.participantsId.map(p => p.get().userId);
      res.json(transaction);
    } else {
      res.sendStatus(500);
    }
  });

const getTransactions = (req, res) =>
  handlers.getTransactions().then((data) => {
    if (data) {
      const transactions = data.map((transaction) => {
        console.log(transaction)
        const t = transaction.get();
        t.participantsId = t.participantsId.map(p => p.get().userId);
        return t;
      });
      res.json(transactions);
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

const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const createTransaction = (req, res) =>
  handlers.createTransaction(req.body).then((id) => {
    if (id) {
      res.json(id);
    } else {
      res.sendStatus(500);
    }
  });

const getTransactions = (req, res) =>
  handlers.getTransactions().then((transactions) => {
    if (transactions) {
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

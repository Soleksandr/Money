const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const createTransaction = (req, res) => {
  const transaction = handlers.createTransaction(req.body);
  if (transaction) {
    res.json(transaction);
  } else if (transaction === null) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
};

const getTransaction = (req, res) => {
  const transaction = handlers.getTransaction(parseInt(req.params.id, 10));
  if (transaction) {
    res.json(transaction);
  } else if (transaction === null) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
  }
};

const getTransactions = (req, res) => {
  const transactions = handlers.getTransactions();
  if (transactions) {
    res.json(transactions);
  } else {
    res.sendStatus(500);
  }
};

router.post('/', (req, res) => {
  createTransaction(req, res);
});

router.get('/', (req, res) => {
  getTransactions(req, res);
});

router.get('/:id', (req, res) => {
  getTransaction(req, res);
});

module.exports = {
  router,
  createTransaction,
  getTransactions,
  getTransaction,
};

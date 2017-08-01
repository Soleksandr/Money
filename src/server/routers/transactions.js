const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

router.post('/', (req, res) => {
  const transaction = handlers.createTransaction(req.body);
  if (transaction) {
    res.json(transaction);
  } else if (transaction === null) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

router.get('/', (req, res) => {
  const transactions = handlers.getTransactions();
  if (transactions) {
    res.json(transactions);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;

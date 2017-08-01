const express = require('express');
const handlers = require('../handlers/users');

const router = express.Router();

router.post('/', (req, res) => {
  const user = handlers.createUser(req.body);
  if (user) {
    res.json(user);
  } else if (user === null) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

router.get('/', (req, res) => {
  const users = handlers.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.sendStatus(500);
  }
});

router.get('/:id', (req, res) => {
  const user = handlers.getUser(parseInt(req.params.id, 10));
  if (user) {
    res.json(user);
  } else if (user === null) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
  }
});

router.get('/:id/transactions', (req, res) => {
  const transactions = handlers.getUserTransactions(parseInt(req.params.id, 10));
  if (transactions) {
    res.json(transactions);
  } else if (transactions === null) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
  }
});

router.get('/:id/transactions/:transactionId', (req, res) => {
  const transaction = handlers.getUserTransaction(parseInt(req.params.id, 10));
  if (transaction) {
    res.json(transaction);
  } else if (transaction === null) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;

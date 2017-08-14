const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const createTransaction = (req, res) => {
  handlers.createTransaction(req.body).then((data) => {
    if (data.length = req.body.participantsId.length) {
      // if (transaction) {
      //   res.json(transaction);
      // } else if (transaction === null) {
      //   res.sendStatus(400);
      // } else {
      //   res.sendStatus(500);
      // }
      res.json(req.body);
    }
  });
};

// const getTransaction = (req, res) => {
//   const transaction = handlers.getTransaction(parseInt(req.params.id, 10));
//   if (transaction) {
//     res.json(transaction);
//   } else if (transaction === null) {
//     res.sendStatus(404);
//   } else {
//     res.sendStatus(500);
//   }
// };

const getTransactions = (req, res) => {
  handlers.getTransactions().then((transactions) => {
    transactions = transactions.map(transaction => transaction.get());
    transactions.forEach(tr => console.log(tr));
      // tr.participnatsId = tr.participnatsId.forEach(id => console.log('for each', id)));
    // console.log('transactions get ====================', transactions);
    if (transactions) {
      res.json(transactions);
    } else {
      res.sendStatus(500);
    }
  });
};

router.post('/', (req, res) => {
  createTransaction(req, res);
});

router.get('/', (req, res) => {
  getTransactions(req, res);
});

// router.get('/:id', (req, res) => {
//   getTransaction(req, res);
// });

module.exports = {
  router,
  createTransaction,
  getTransactions,
  // getTransaction,
};

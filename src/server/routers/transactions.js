// const express = require('express');
// const handlers = require('../handlers/transactions');

// const router = express.Router();

// const createTransaction = (req, res) =>
//   handlers.createTransaction(req.body).then((transaction) => {
//     if (transaction) {
//       res.json(transaction);
//     } else {
//       res.sendStatus(500);
//     }
//   });

// const getTransactions = (req, res) =>
//   handlers.getTransactions().then((transactions) => {
//     if (transactions) {
//       const userId = req.user.id;
//       const userTransactions = transactions.filter(t =>
//         t.payer.id === userId || t.participants.find(p => p.id === userId));
//       res.json(userTransactions);
//     } else {
//       res.sendStatus(500);
//     }
//   });

// router.post('/', (req, res) => {
//   createTransaction(req, res);
// });

// router.get('/', (req, res) => {
//   getTransactions(req, res);
// });

// module.exports = {
//   router,
//   createTransaction,
//   getTransactions,
// };

const express = require('express');
const handlers = require('../handlers/users');

const router = express.Router();

const createUser = (req, res) => {
  handlers.createUser(req.body)
    .then((user) => {
      if (user) {
        res.json(user);
      } else if (user === null) {
        res.sendStatus(400);
      } else {
        res.sendStatus(500);
      }
    });
};

const getUsers = (req, res) => {
  handlers.getUsers().then((users) => {
    res.json(users);
  });
};

// const getUser = (req, res) => {
//   const user = handlers.getUser(parseInt(req.params.id, 10));
//   if (user) {
//     res.json(user);
//   } else if (user === null) {
//     res.sendStatus(404);
//   } else {
//     res.sendStatus(500);
//   }
// };

// const getUserTransactions = (req, res) => {
//   const transactions = handlers.getUserTransactions(parseInt(req.params.id, 10));
//   if (transactions) {
//     res.json(transactions);
//   } else if (transactions === null) {
//     res.sendStatus(404);
//   } else {
//     res.sendStatus(500);
//   }
// };

router.post('/', (req, res) => {
  createUser(req, res);
});

router.get('/', (req, res) => {
  getUsers(req, res);
});

// router.get('/:id', (req, res) => {
//   getUser(req, res);
// });

// router.get('/:id/transactions', (req, res) => {
//   getUserTransactions(req, res);
// });

module.exports = {
  router,
  createUser,
  // getUser,
  getUsers,
  // getUserTransactions,
};

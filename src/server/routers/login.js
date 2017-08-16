const express = require('express');
const handlers = require('../handlers/transactions');

const router = express.Router();

const checkLoginData = (req, res) =>
  handlers.createTransaction(req.body).then((data) => {
    if (data) {
      const transaction = data[0].get();
      transaction.participantsId = transaction.participantsId.map(p => p.get().userId);
      res.json(transaction);
    } else {
      res.sendStatus(500);
    }
  });

router.post('/', (req, res) => {
  checkLoginData(req, res);
});


module.exports = {
  router,
  checkLoginData,
};

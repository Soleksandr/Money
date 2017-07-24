const handlers = require('../handlers/transactions');

module.exports = (app) => {
  app.post('/transactions', (req, res) => {
    const transaction = handlers.createTransaction(req.body);
    if (transaction) {
      res.json(transaction);
    } else if (transaction === null) {
      res.sendStatus(400);
    } else {
      res.sendSatus(500);
    }
  });

  app.get('/transactions', (req, res) => {
    const transactions = handlers.getTransactions();
    if (transactions) {
      res.json(transactions);
    } else {
      res.sendSatus(500);
    }
  });
};

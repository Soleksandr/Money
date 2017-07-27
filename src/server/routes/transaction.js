const handlers = require('../handlers/transactions');

module.exports = (app) => {
  app.get('/users/:id/transactions/:transactionId', (req, res) => {
    const transaction = handlers.getTransaction(Number(req.params.transactionId));
    if (transaction) {
      res.json(transaction);
    } else if (transaction === null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  });
};

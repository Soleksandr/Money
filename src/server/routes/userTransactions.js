const handlers = require('../handlers/users');

module.exports = (app) => {
  app.get('/users/:id/transactions', (req, res) => {
    const transactions = handlers.getTransactionsOfUser(parseInt(req.params.id, 10));
    if (transactions) {
      res.json(transactions);
    } else if (transactions === null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  });
};

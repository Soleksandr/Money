const handlers = require('../handlers/users');

module.exports = (app) => {
  app.get('/users/:id/transactions', (req, res) => {
    const transactions = handlers.getTransactionsOfUser(Number(req.params.id));
    if (transactions) {
      res.json(transactions);
    } else if (transactions === null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  });
};
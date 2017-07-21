const handlers = require('../handlers/users');

module.exports = (app) => {
  app.post('/users', (req, res) => {
    const user = handlers.createUser(req.body);
    if (user) {
      res.json(user);
    } else if (user === null) {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/users', (req, res) => {
    const users = handlers.getUsers();
    if (users) {
      res.json(users);
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/users/:id/transactions', (req, res) => {
    const transactions = handlers.getTransactionsOfUser(req.params.id);
    res.json(transactions);
  });
};

const handlers = require('../handlers/transactions');

module.exports = (app) => {
  app.route('/transactions')
     .post(handlers.addTransaction)
     .get(handlers.getTransactions);
};

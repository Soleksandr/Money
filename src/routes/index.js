const users = require('./users');
const transactions = require('./transactions');

module.exports = (app) => {
  users(app);
  transactions(app);
};

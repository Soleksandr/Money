const user = require('./user');
const transaction = require('./transaction');

const Query = { ...user.Query, ...transaction.Query };
const Mutation = { ...user.Mutation, ...transaction.Mutation };

module.exports = {
  Query,
  Mutation,
};

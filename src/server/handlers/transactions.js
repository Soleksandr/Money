const { modelTransaction } = require('../models');
const { modelUser } = require('../models');

const createTransaction = ({ title, cost, payerId, participantsId }) =>
  modelTransaction.create({
    title,
    cost,
    payerId,
  })
    .then(transaction =>
      transaction.addUsers(participantsId))
    .then(result => result[0][0].get({ plain: true }).transactionId)
    .catch(e => console.error(e));

const getTransactions = () => modelTransaction.findAll({
  attributes: ['id', 'title', 'cost', 'payerId'],
  include: [{ model: modelUser }],
})
  .then(transactions =>
    transactions.map((t) => {
      const transaction = t.get({ plain: true });
      transaction.participantsId = transaction.users.map(u => u.id);
      return transaction;
    }))
    .catch(e => console.error(e));


module.exports = {
  createTransaction,
  getTransactions,
};

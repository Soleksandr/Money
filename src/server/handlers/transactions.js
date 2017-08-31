const { modelTransaction } = require('../models');
const { modelUser } = require('../models');

const createTransaction = ({ title, cost, payerId, participantsId }) =>
  modelTransaction.create({
    title,
    cost,
    payerId,
  })
    .then(transaction =>
      transaction.addParticipants(participantsId))
    .then(result => modelTransaction.findOne({
      where: {
        id: result[0][0].get({ plain: true }).transactionId,
      },
      attributes: ['id', 'title', 'cost', 'payerId'],
      include: [{
        model: modelUser,
        as: 'participants',
      }],
    })
    .then((t) => {
      console.log('---------------------------------- transaction --------------------', t)
      const transaction = t.get({ plain: true });
      transaction.participants = transaction.participants.map(p => p.id);
      return transaction;
    }))
    .catch(e => console.error(e));

const getTransactions = () => modelTransaction.findAll({
  attributes: ['id', 'title', 'cost', 'payerId'],
  include: [{
    model: modelUser,
    as: 'participants',
  }],
})
  .then(data =>
    data.map((t) => {
      const transaction = t.get({ plain: true });
      transaction.participantsId = transaction.participants.map(p => p.id);
      return transaction;
    }))
  .catch(e => console.error(e));


module.exports = {
  createTransaction,
  getTransactions,
};

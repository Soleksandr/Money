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
      attributes: ['id', 'title', 'cost'],
      include: [
        { model: modelUser,
          as: 'participants',
          attributes: ['id', 'name', 'surname', 'username'],
          through: {
            attributes: [],
          },
        },
        { model: modelUser,
          as: 'payer',
          attributes: ['id', 'name', 'surname', 'username'],
        },
      ],
    })
    .then((t) => {
      const transaction = t.get({ plain: true });
      return transaction;
    }))
    .catch(e => console.error(e));

const getTransactions = () => modelTransaction.findAll({
  attributes: ['id', 'title', 'cost'],
  include: [
    { model: modelUser,
      as: 'participants',
      attributes: ['id', 'name', 'surname', 'username'],
      through: {
        attributes: [],
      },
    },
    { model: modelUser,
      as: 'payer',
      attributes: ['id', 'name', 'surname', 'username'],
    },
  ],
})
  .then(data =>
    data.map((t) => {
      const transaction = t.get({ plain: true });
      return transaction;
    }))
  .catch(e => console.error(e));


module.exports = {
  createTransaction,
  getTransactions,
};

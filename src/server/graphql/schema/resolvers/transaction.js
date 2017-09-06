const { modelUser } = require('../../../models');
const { modelTransaction } = require('../../../models');

const getTransactions = ({ passport: { user } }) => {
  if (user) {
    return modelTransaction.findAll({
      attributes: ['id', 'title', 'cost', 'payerId'],
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
    }).then((transactions) => {
      const userTransactions = transactions.filter(t =>
        t.payer.id === user.id || t.participants.find(p => p.id === user.id));
      return userTransactions;
    });
  }
  return [];
};

const createTransaction = (_, data) => {
  const { title, cost, payerId, participantsId } = data;
  return modelTransaction.create({
    title,
    cost,
    payerId,
  }).then(transaction =>
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
      }));
};

module.exports = {
  Query: {
    getTransactions,
  },
  Mutation: {
    createTransaction,
  },
};

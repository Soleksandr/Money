const { modelUser } = require('../../../models');
const { modelTransaction } = require('../../../models');
const { db } = require('../../../models/');
const sequelize = require('sequelize');
const constants = require('../../../../constants');

const getTransactions = ({ passport: { user } }) =>
db.query(constants.RAW_Q_TRANSACTIONS,
  { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT });

const createTransaction = (_, data) => {
  const { title, cost, payerId, participantsId } = data;
  return modelTransaction.create({
    title,
    cost,
    payerId,
  }).then(transaction =>
      transaction.addParticipants(participantsId))
      .then(result =>
          modelTransaction.findOne({
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

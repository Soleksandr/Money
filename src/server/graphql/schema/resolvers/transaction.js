const { modelUser } = require('../../../models');
const { modelTransaction } = require('../../../models');
const { db } = require('../../../models/');
const sequelize = require('sequelize');
const constants = require('../../../../constants');

const getTransactions = ({ passport: { user } }) =>
db.query(constants.RAW_Q_TRANSACTIONS,
  { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      const transactions = [];
      result.forEach((item) => {
        const transaction = transactions.find(t => t.id === item.transactionId);
        if (transaction) {
          transaction.participants.push({
            id: item.participantId,
            name: item.participantName,
            surname: item.participantSurname,
            username: item.participantUsername,
          });
        } else {
          transactions.push({
            id: item.transactionId,
            title: item.title,
            cost: item.cost,
            payer: {
              id: item.payerId,
              name: item.payerName,
              surname: item.payerSurname,
              username: item.payerUsername,
            },
            participants: [{
              id: item.participantId,
              name: item.participantName,
              surname: item.participantSurname,
              username: item.participantUsername,
            }],
          });
        }
      });
      return transactions;
    });

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

const { modelUser } = require('../../../models');
const { modelTransaction } = require('../../../models');
const { modelUserTransaction } = require('../../../models');
const { db } = require('../../../models/');
const sequelize = require('sequelize');
const constants = require('../../../../constants');

const getTransactions = ({ passport: { user } }) =>
  db.query(constants.RAW_Q_USER_TRANSACTIONS,
    { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT })
      .then((result) => {
        const transactions = [];
        let id = result[0].transactionId;
        let participants = [];
        result.forEach((item, i) => {
          if (item.transactionId === id && result[i + 1]) {
            participants.push({
              id: item.participantId,
              name: item.participantName,
              surname: item.participantSurname,
              username: item.participantUsername,
            });
          } else {
            transactions.push({
              id: result[i - 1].transactionId,
              title: result[i - 1].title,
              cost: result[i - 1].cost,
              payer: {
                id: result[i - 1].payerId,
                name: result[i - 1].payerName,
                surname: result[i - 1].payerSurname,
                username: result[i - 1].payerUsername,
              },
              participants,
            });
            participants = [];
            id = item.transactionId;
          }
        });
        return transactions;
      });

const createTransaction = (_, data) => {
  const { title, cost, payerId, participantsId } = data;
  modelTransaction.create({
    title,
    cost,
    payerId,
  }).then(transaction =>
      transaction.addParticipants(participantsId))
      .then(result =>
        modelUserTransaction.create({
          payerId,
          moneyPerPerson: (Math.round((cost / participantsId.length) * 100) / 100).toFixed(2),
        }).then(() =>
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
          })));
};

module.exports = {
  Query: {
    getTransactions,
  },
  Mutation: {
    createTransaction,
  },
};

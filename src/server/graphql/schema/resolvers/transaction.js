const { modelUser } = require('../../../models');
const { modelTransaction } = require('../../../models');
// const { db } = require('../../../models/');
// const sequelize = require('sequelize');
// const constants = require('../../../../constants');

const getTransactions = ({ passport: { user } }) =>
  modelUser.getTransactions(user.id);
// modelUser.getTransactions(user.id).then(tr => {
//   return Promise.all(tr.map(t => modelTransaction.getParticipants(t.id).then(p => {tr[0].participants = p; return tr;})))
//   .then(result => {
//     result[0].forEach(r => {
//       console.log('============== transactions ============', r);
//     })
//       return result[0]
//     })
//   });


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

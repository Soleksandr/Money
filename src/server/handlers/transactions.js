const { modelTransaction } = require('../models');
const { modelUserTransaction } = require('../models');

const createTransaction = data =>
  modelTransaction.create({
    title: data.title,
    cost: data.cost,
    payerId: data.payerId,
  })
    .then(res => Promise.all(data.participantsId.map(id =>
      modelUserTransaction.create({
        userId: id,
        transactionId: res.id,
      }))))
    .then(d =>
      modelTransaction.findAll({
        where: { id: d[0].get().transactionId },
        include: [{
          model: modelUserTransaction,
          as: 'participantsId',
          attributes: ['userId'],
        }],
      }),
    ).catch(e => console.error(e));

const getTransactions = () => modelTransaction.findAll({
  include: [{
    model: modelUserTransaction,
    as: 'participantsId',
    attributes: ['userId'],
  }],
}).catch(e => console.error(e));

module.exports = {
  createTransaction,
  getTransactions,
};

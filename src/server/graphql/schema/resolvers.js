const bcrypt = require('bcrypt');
const { modelUser } = require('../../models');
const { modelTransaction } = require('../../models');

const saltRounds = 10;

const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
});

const getTransactions = () => modelTransaction.findAll({
  attributes: ['id', 'title', 'cost', 'payerId'],
  include: [
    { model: modelUser, as: 'payer' },
    { model: modelUser, as: 'participantsId' },
  ],
});


const createUser = (_, data) => {
  const { name, surname, username, password } = data;
  return bcrypt.hash(password, saltRounds).then(hash =>
    modelUser.create({
      username,
      name,
      surname,
      password: hash,
    }));
};

const createTransaction = (_, data) => {
  const { title, cost, payerId, participantsId } = data;
  return modelTransaction.create({
    title,
    cost,
    payerId,
  }).then(transaction =>
      transaction.addParticipants(participantsId));
};

module.exports = {
  Query: {
    getUsers,
    getTransactions,
  },
  Mutation: {
    createUser,
    createTransaction,
  },
};

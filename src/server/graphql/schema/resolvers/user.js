const bcrypt = require('bcrypt');
const { modelUser } = require('../../../models');
const { getTransactions } = require('./transaction').Query;

const saltRounds = 10;

const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
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

const getParticipants = (data) => {
  const user = data.passport.user;
  if (user) {
    return getTransactions(data).then((transactions) => {
      let participant = null;
      const userId = user.id;
      const result = [];
      const nextParticipants = [];
      transactions.forEach((t) => {
        const money = (Math.round((t.cost / t.participants.length) * 100) / 100).toFixed(2);
        if (t.payer.id === userId) {
          t.participants.forEach((p) => {
            participant = { ...p.dataValues, money };
            if (participant.id !== userId) nextParticipants.push(participant);
          });
        } else {
          participant = { ...t.payer.dataValues, money: -money };
          nextParticipants.push(participant);
        }
      });
      nextParticipants.forEach((nextP) => {
        const index = result.findIndex(p => p.id === nextP.id);
        if (index !== -1) {
          participant = result[index];
          result[index] = { ...participant,
            money: (Math.round((+participant.money + +nextP.money) * 100) / 100).toFixed(2) };
        } else {
          result.push(nextP);
        }
      });
      return result;
    });
  }
  return [];
};

module.exports = {
  Query: {
    getUsers,
    getParticipants,
  },
  Mutation: {
    createUser,
  },
};

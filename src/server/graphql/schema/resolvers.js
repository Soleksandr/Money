const bcrypt = require('bcrypt');

const { modelUser } = require('../../models');
const { modelTransaction } = require('../../models');

const saltRounds = 10;

const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
});

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

const createUser = (request, data) => {
  const { name, surname, username, password } = data;
  return bcrypt.hash(password, saltRounds).then(hash =>
    modelUser.create({
      username,
      name,
      surname,
      password: hash,
    }));
};

const addCoParticipant = (coParticipants, p, userId) => {
  const index = coParticipants.findIndex(coP => coP.id === p.id);
  if (index !== -1) {
    const coP = coParticipants[index];
    coParticipants[index] = { ...coP, money: (Math.round((+p.money + +coP.money) * 100) / 100).toFixed(2) };
  } else if (p.id !== userId) {
    coParticipants.push(p);
  }
};

const getParticipantsPureFunc = (queryHandler, participantsHandler) => (data) => {
  const user = data.passport.user;
  if (user) {
    return queryHandler(data).then((transactions) => {
      const userId = user.id;
      const coParticipants = [];
      transactions.forEach((t) => {
        const money = (Math.round((t.cost / t.participants.length) * 100) / 100).toFixed(2);
        if (t.payer.id === userId) {
          t.participants.forEach((p) => {
            p = p.dataValues;
            p.money = money;
            participantsHandler(coParticipants, p, userId);
          });
        } else {
          t.participants.forEach((p) => {
            p = p.dataValues;
            p.money = '0';
            participantsHandler(coParticipants, p, userId);
          });
          t.payer = t.payer.dataValues;
          const p = { ...t.payer, money: -money };
          participantsHandler(coParticipants, p, userId);
        }
      });
      return coParticipants;
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
    getUsers,
    getTransactions,
    getParticipants: getParticipantsPureFunc(getTransactions, addCoParticipant),
  },
  Mutation: {
    createUser,
    createTransaction,
  },
  getParticipantsPureFunc,
};

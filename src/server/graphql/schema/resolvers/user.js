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

const getParticipants = ({ passport: { user } }) =>
  modelUser.getParticipants(user.id);


module.exports = {
  Query: {
    getUsers,
    getParticipants,
  },
  Mutation: {
    createUser,
  },
};

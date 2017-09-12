const { modelUser } = require('../../../models');
const { db } = require('../../../models/');
const sequelize = require('sequelize');
const constants = require('../../../../constants');


const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
});

const addUser = (_, data) => {
  const { name, surname, username } = data;
  return modelUser.create({
    username,
    name,
    surname,
  });
};

const getParticipants = ({ passport: { user } }) =>
  db.query(constants.RAW_Q_PARTICIPANTS,
    { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT });


module.exports = {
  Query: {
    getUsers,
    getParticipants,
  },
  Mutation: {
    addUser,
  },
};

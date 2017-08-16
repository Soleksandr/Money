const { modelUser } = require('../models');

const createUser = data =>
  modelUser.create({
    name: data.name,
    surname: data.surname,
  });

const getUsers = () => modelUser.findAll();

module.exports = {
  createUser,
  getUsers,
};

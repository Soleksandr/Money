const { modelUser } = require('../models');

const createUser = data =>
  modelUser.create({
    username: data.username,
    name: data.name,
    surname: data.surname,
    password: data.password,
  });

const getUsers = () => modelUser.findAll();

module.exports = {
  createUser,
  getUsers,
};

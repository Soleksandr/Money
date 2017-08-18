const bcrypt = require('bcrypt');
const { modelUser } = require('../models');

const saltRounds = 10;

const createUser = ({ username, name, surname, password }) =>
  bcrypt.hash(password, saltRounds).then(hash =>
    modelUser.create({
      username,
      name,
      surname,
      password: hash,
    })).then(user => user.get());

const getUsers = () => modelUser.findAll();

module.exports = {
  createUser,
  getUsers,
};

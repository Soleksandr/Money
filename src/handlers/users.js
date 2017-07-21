const db = require('../db');
const validator = require('../validator');

const createUser = data => (validator.validateOnEmptiness(data) ? new db.User(data) : null);

const getUsers = () => db.users;

module.exports = {
  createUser,
  getUsers,
};

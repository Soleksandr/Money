// const bcrypt = require('bcrypt');
const { modelUser } = require('../models');

// const saltRounds = 10;

// const createUser = ({ username, name, surname, password }) =>
//   bcrypt.hash(password, saltRounds).then(hash =>
//     modelUser.create({
//       username,
//       name,
//       surname,
//       password: hash,
//     })).then(user => user.get({ plain: true }).id);


const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
})
  .then(data => data.map(i => i.get({ plain: true })));

module.exports = {
  // createUser,
  getUsers,
};

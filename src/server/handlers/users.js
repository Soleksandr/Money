const { modelUser } = require('../models');

const getUsers = () => modelUser.findAll({
  attributes: ['id', 'username', 'name', 'surname'],
})
  .then(users => users.map(user => user.get({ plain: true })));

module.exports = {
  getUsers,
};

const { modelUser } = require('../models');

const getSessionUser = id =>
  modelUser.findById(id)
    .catch(e => console.error(e));


module.exports = {
  getSessionUser,
};

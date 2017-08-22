const { modelUser } = require('../models');

const getSessionData = id =>
  modelUser.findById(id)
    .catch(e => console.error(e));


module.exports = {
  getSessionData,
};

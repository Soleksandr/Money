const express = require('express');

const router = express.Router();

const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.json(null);
};

router.get('/', logout);

module.exports = {
  router,
  logout,
};

const express = require('express');

const router = express.Router();

const getSessionUser = (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.json(null);
};

router.get('/', (req, res) => {
  getSessionUser(req, res);
});


module.exports = {
  router,
  getSessionUser,
};

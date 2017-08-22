const express = require('express');
const handlers = require('../handlers/authentication');

const router = express.Router();

const getSessionData = (req, res) => {
  if (req.user) {
    handlers.getSessionData(req.user)
      .then(({ name, surname }) =>
        res.json({
          name,
          surname,
        }),
      );
  } else {
    res.json(null);
  }
};

router.get('/', (req, res) => {
  getSessionData(req, res);
});


module.exports = {
  router,
  getSessionData,
};

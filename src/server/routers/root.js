const express = require('express');
const handlers = require('../handlers/root');

const router = express.Router();

const getSessionUser = (req, res) => {
  if (req.user) {
    return handlers.getSessionUser(req.user.id)
      .then(({ id, username, name, surname }) =>
        res.json({
          id,
          username,
          name,
          surname,
        }),
      );
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

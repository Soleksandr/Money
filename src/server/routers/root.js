const express = require('express');
const handlers = require('../handlers/root');

const router = express.Router();

const getSessionUser = (req, res) => {
  // console.log(' ------------------------ req.user ------------------------ ', req.user);
  if (req.user) {
    handlers.getSessionUser(req.user)
      .then(({ id, username, name, surname }) =>
        res.json({
          id,
          username,
          name,
          surname,
        }),
      );
  } else {
    res.json(null);
  }
};

router.get('/', (req, res) => {
  getSessionUser(req, res);
});


module.exports = {
  router,
  getSessionUser,
};

const express = require('express');
const handlers = require('../handlers/registration');
const passport = require('passport');

const router = express.Router();

const createUser = (req, res) =>
  handlers.createUser(req.body).then((user) => {
    if (user) {
      const userData = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
      };
      req.login(userData, () => {
        res.json(userData);
      });
    } else {
      res.sendStatus(500);
    }
  });

router.post('/', (req, res) => {
  createUser(req, res);
});

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});


module.exports = {
  router,
  createUser,
};

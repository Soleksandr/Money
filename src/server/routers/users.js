const express = require('express');
const handlers = require('../handlers/users');
const passport = require('passport');

const router = express.Router();

const authenticationMiddleware = dataToReturn =>
  (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) {
      return next();
    }
    res.json(dataToReturn);
  };

const createUser = (req, res) =>
  handlers.createUser(req.body).then((user) => {
    if (user) {
      req.login(user.id, () => {
        res.json({
          id: user.id,
          name: user.name,
          surname: user.surname,
        });
      });
    } else {
      res.sendStatus(500);
    }
  });

const getUsers = (req, res) =>
  handlers.getUsers().then((users) => {
    if (users) {
      res.json(users);
    } else {
      res.sendStatus(500);
    }
  });

router.post('/', (req, res) => {
  createUser(req, res);
});

router.get('/', (req, res) => {
  getUsers(req, res);
});

module.exports = {
  router,
  createUser,
  getUsers,
};

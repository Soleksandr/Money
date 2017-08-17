const express = require('express');
const handlers = require('../handlers/users');
const passport = require('passport');

const router = express.Router();

const createUser = (req, res) =>
  handlers.createUser(req.body).then((user) => {
    if (user) {
      console.log(user.id, '=========userid')
      req.login(user.id, () => {
        console.log('loged in successfuly');
        // res.json(user);
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

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = {
  router,
  createUser,
  getUsers,
};

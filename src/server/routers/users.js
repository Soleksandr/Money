const express = require('express');
const handlers = require('../handlers/users');

const router = express.Router();

const createUser = (req, res) => {
  handlers.createUser(req.body).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(500);
    }
  });
};

const getUsers = (req, res) => {
  handlers.getUsers().then((users) => {
    if (users) {
      res.json(users);
    } else {
      res.sendStatus(500);
    }
  });
};

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

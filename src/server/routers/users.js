const express = require('express');
const handlers = require('../handlers/users');

const router = express.Router();

const getUsers = (req, res) =>
  handlers.getUsers().then((users) => {
    if (users) {
      res.json(users);
    } else {
      res.sendStatus(500);
    }
  });

router.get('/', (req, res) => {
  getUsers(req, res);
});

module.exports = {
  router,
  getUsers,
};

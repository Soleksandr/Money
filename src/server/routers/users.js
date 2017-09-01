const express = require('express');
const handlersUsers = require('../handlers/users');
const handlersTransactions = require('../handlers/transactions');

const router = express.Router();

const getUsers = (req, res) =>
  handlersUsers.getUsers().then((users) => {
    if (users) {
      res.json(users);
    } else {
      res.sendStatus(500);
    }
  });

const getParticipants = (req, res) => {
  if (req.user) {
    handlersTransactions.getTransactions(req.user.id).then((transactions) => {
      if (transactions) {
        const userId = req.user.id;
        const userTransactions = transactions.filter(t =>
          t.payer.id === userId || t.participants.find(p => p.id === userId));
        const coParticipants = [];
        userTransactions.forEach((t) => {
          const money = Math.round((t.cost / t.participants.length) * 100) / 100;
          t.participants.forEach((p) => {
            if (p.id !== userId) {
              if (userId === t.payer.id) {
                p.money = money;
              } else if (p.id === t.payer.id) {
                p.money = -money;
              } else {
                p.money = 0;
              }
              const index = coParticipants.findIndex(coP => coP.id === p.id);
              if (index !== -1) {
                const coP = coParticipants[index];
                coParticipants[index] = { ...coP, money: Math.round((p.money + coP.money) * 100) / 100 };
              } else {
                coParticipants.push(p);
              }
            }
          });
        });
        res.json(coParticipants);
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

router.get('/', (req, res) => {
  getUsers(req, res);
});

router.get('/participants', (req, res) => {
  getParticipants(req, res);
});

module.exports = {
  router,
  getUsers,
  getParticipants,
};

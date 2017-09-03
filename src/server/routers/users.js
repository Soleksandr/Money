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

const addCoParticipant = (coParticipants, p, userId) => {
  const index = coParticipants.findIndex(coP => coP.id === p.id);
  if (index !== -1) {
    const coP = coParticipants[index];
    coParticipants[index] = { ...coP, money: (Math.round((+p.money + +coP.money) * 100) / 100).toFixed(2) };
  } else if (p.id !== userId) {
    coParticipants.push(p);
  }
};

const getParticipantsPureFunc = participantsHandler => (req, res) => {
  if (req.user) {
    return handlersTransactions.getTransactions(req.user.id).then((transactions) => {
      if (transactions) {
        const userId = req.user.id;
        const userTransactions = transactions.filter(t =>
          t.payer.id === userId || t.participants.some(p => p.id === userId));
        const coParticipants = [];
        userTransactions.forEach((t) => {
          const money = (Math.round((t.cost / t.participants.length) * 100) / 100).toFixed(2);
          if (t.payer.id === userId) {
            t.participants.forEach(p => {
              p.money = money;
              participantsHandler(coParticipants, p, userId);
            });
          } else {
            t.participants.forEach(p => {
              p.money = '0';
              participantsHandler(coParticipants, p, userId);
            });
            const p = { ...t.payer, money: -money }
            participantsHandler(coParticipants, p, userId);
          }
        });
        res.json(coParticipants);
      } else {
        res.sendStatus(500);
      }
    });
  }
  return res.sendStatus(401);
};

router.get('/', (req, res) => {
  getUsers(req, res);
});

router.get('/participants', (req, res) => {
  getParticipantsPureFunc(addCoParticipant)(req, res);
});

module.exports = {
  router,
  getUsers,
  getParticipants: getParticipantsPureFunc(addCoParticipant),
  getParticipantsPureFunc,
  addCoParticipant,
};

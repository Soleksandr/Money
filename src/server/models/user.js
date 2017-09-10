const sequelize = require('sequelize');
const { db } = require('../models');
const constants = require('../../constants');

module.exports = (db, type) => {
  const User = db.define('user', {
    username: {
      type: type.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: type.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    surname: {
      type: type.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    password: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  User.getTransactions = id =>
    db.query(constants.RAW_Q_TRANSACTIONS,
      { replacements: { userId: id }, type: sequelize.QueryTypes.SELECT })
        .then((result) => {
          const transactions = [];
          result.forEach((item) => {
            const transaction = transactions.find(t => t.id === item.transactionId);
            if (transaction) {
              transaction.participants.push({
                id: item.participantId,
                name: item.participantName,
                surname: item.participantSurname,
                username: item.participantUsername,
              });
            } else {
              transactions.push({
                id: item.transactionId,
                title: item.title,
                cost: item.cost,
                payer: {
                  id: item.payerId,
                  name: item.payerName,
                  surname: item.payerSurname,
                  username: item.payerUsername,
                },
                participants: [{
                  id: item.participantId,
                  name: item.participantName,
                  surname: item.participantSurname,
                  username: item.participantUsername,
                }],
              });
            }
          });
          return transactions;
        });
  User.getParticipants = id =>
    db.query(constants.RAW_Q_PARTICIPANTS,
      { replacements: { userId: id }, type: sequelize.QueryTypes.SELECT });
  return User;
};

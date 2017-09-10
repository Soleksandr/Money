const sequelize = require('sequelize');
const { db } = require('../models');
const constants = require('../../constants');

module.exports = (db, type) => {
  const Transaction = db.define('transaction', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: type.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cost: {
      type: type.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Transaction.getParticipants = id =>
    db.query(constants.RAW_Q_TRANSACTION_PARTICIPNATS,
      { replacements: { transactionId: id }, type: sequelize.QueryTypes.SELECT })
  return Transaction;
};

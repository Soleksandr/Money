module.exports = (db, type) => {
  const Transaction = db.define('transaction', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: type.CHAR(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cost: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    payerId: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
  });
  return Transaction;
};

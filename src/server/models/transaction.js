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

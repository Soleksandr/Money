module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    paeyr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Transactions.belongsToMany(models.Users, {
          through: 'usersTransactions',
        });
      },
    },
  });
  return Transactions;
};

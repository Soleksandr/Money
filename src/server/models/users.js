module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    surname: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Users.belongsToMany(models.Transactions, {
          through: 'usersTransactions',
        });
      },
    },
  });
  return Users;
};

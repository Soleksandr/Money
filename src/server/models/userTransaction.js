module.exports = (db, type) => {
  const UserTransaction = db.define('userTransaction', {
    user_id: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    transaction_id: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
  });
  return UserTransaction;
};



// module.exports = (sequelize, DataTypes) => {
//   const UserTransaction = sequelize.define('userTransaction', {
//     user_id: {
//       type: DataTypes.CHAR(10),
//       allowNull: false,
//       validate: {
//         isAlpha: true,
//         notEmpty: true,
//       },
//     },
//     transaction_id: {
//       type: DataTypes.CHAR(10),
//       allowNull: false,
//       validate: {
//         isAlpha: true,
//         notEmpty: true,
//       },
//     },
//   }, {
//     classMethods: {
//       associate: (models) => {
//         UserTransaction.belongsTo(models.Transactions);
//         UserTransaction.belongsTo(models.Users);
//       },
//     },
//   });
//   return UserTransaction;
// };

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
    payer_id: {
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


// module.exports = (type, DataTypes) => {
//   const Transaction = db.define('transaction', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.CHAR(30),
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     cost: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         isNumeric: true,
//         notEmpty: true,
//       },
//     },
//     paeyr_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         isNumeric: true,
//         notEmpty: true,
//       },
//     },
//   });
//   return Transaction;
// };

module.exports = (db, type) => {
  const User = db.define('user', {
    name: {
      type: type.CHAR(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    surname: {
      type: type.CHAR(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
  });
  return User;
};



// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('user', {
//     name: {
//       type: DataTypes.CHAR(10),
//       allowNull: false,
//       validate: {
//         isAlpha: true,
//         notEmpty: true,
//       },
//     },
//     surname: {
//       type: DataTypes.CHAR(10),
//       allowNull: false,
//       validate: {
//         isAlpha: true,
//         notEmpty: true,
//       },
//     },
//   });
//   return User;
// };

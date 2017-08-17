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

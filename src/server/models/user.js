module.exports = (db, type) => {
  const User = db.define('user', {
    username: {
      type: type.STRING(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    name: {
      type: type.STRING(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    surname: {
      type: type.STRING(10),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    password: {
      type: type.STRING(15),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
  });
  return User;
};

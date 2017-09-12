module.exports = (dataBase, type) => {
  const User = dataBase.define('user', {
    username: {
      type: type.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: type.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    surname: {
      type: type.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    password: {
      type: type.STRING,
      defaultValue: null,
    },
  });
  return User;
};

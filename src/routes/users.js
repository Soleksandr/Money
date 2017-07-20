const handlers = require('../handlers/users');

module.exports = (app) => {
  app.route('/users')
     .post(handlers.addUser)
     .get(handlers.getUsers);

  app.route('/users/:id')
     .get(handlers.getUser);
};

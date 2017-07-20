const data = require('../data');

const addUser = (req, res) => {
  const newUser = new data.User(req.body);
  data.users.push(newUser);
  res.json(newUser);
};

const getUsers = (req, res) => {
  res.json(data.users);
};

const getUser = (req, res) => {
  const currentUser = data.users.find(
    user => user.id === Number(req.params.id));
  res.json(currentUser);
};

module.exports = {
  addUser,
  getUsers,
  getUser,
};

const correctTransaction = {
  title: 'goods',
  cost: 10,
  payerId: 1,
  participantsId: [1, 2, 3],
};

const emptyTitle = {
  title: '',
  cost: 10,
  payerId: 2,
  participantsId: [1, 2, 3],
};

const correctUser = {
  name: 'Ivan',
  surname: 'Ivanov',
};

const emptyName = {
  name: '',
  surname: 'Ivanov',
};

module.exports = {
  correctTransaction,
  emptyTitle,
  correctUser,
  emptyName,
};

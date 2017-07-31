let transactionsIdCounter = 2;
let usersIdCounter = 2;

const transactions = [
  {
    title: 'goods',
    cost: 300,
    payerId: 0,
    participantsId: [0, 1, 2],
    id: 0,
  },
  {
    title: 'food',
    cost: 100,
    payerId: 2,
    participantsId: [0, 2],
    id: 1,
  },
  {
    title: 'taxi',
    cost: 50,
    payerId: 1,
    participantsId: [0, 2],
    id: 2,
  },
];

const users = [
  {
    name: 'Ivanov',
    surname: 'Ivan',
    id: 0,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 1,
  },
  {
    name: 'Andrey',
    surname: 'Andreev',
    id: 2,
  },
];

class Transaction {
  constructor({ title, cost, payerId, participantsId }) {
    this.title = title;
    this.cost = cost;
    this.participantsId = participantsId;
    this.payerId = payerId;
    this.id = Transaction.generateId();
  }

  static generateId = () => transactionsIdCounter += 1;

}

class User {
  constructor({ name, surname }) {
    this.name = name;
    this.surname = surname;
    this.id = User.generateId();
  }

  static generateId = () => usersIdCounter += 1;
}

module.exports = {
  Transaction,
  User,
  users,
  transactions,
};

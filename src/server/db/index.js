let transactionsIdCounter = 0;
let usersIdCounter = 0;


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

const transactions = [
  {
    title: 'goods',
    cost: 50,
    payerId: 1,
    participantsId: [1, 2, 3],
    id: Transaction.generateId(),
  },
  {
    title: 'car',
    cost: 5000,
    payerId: 3,
    participantsId: [1, 2],
    id: Transaction.generateId(),
  },
  {
    title: 'house',
    cost: 10000,
    payerId: 1,
    participantsId: [2],
    id: Transaction.generateId(),
  },
];
const users = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: User.generateId(),
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: User.generateId(),
  },
  {
    name: 'Vasil',
    surname: 'Rodugin',
    id: User.generateId(),
  },
];

module.exports = {
  Transaction,
  User,
  users,
  transactions,
};

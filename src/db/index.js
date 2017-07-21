let transactionsIdCounter = 0;
let usersIdCounter = 0;

const transactions = [];
const users = [];

class Transaction {
  constructor({ title, cost, payerId, participantsId }) {
    this.title = title;
    this.cost = cost;
    this.participantsId = participantsId;
    this.payerId = payerId;
    this.id = Transaction.generateId();
    transactions.push(this);
  }

  static generateId = () => transactionsIdCounter += 1;

}

class User {
  constructor({ name, surname }) {
    this.name = name;
    this.surname = surname;
    this.transactionsId = [];
    this.id = User.generateId();
    users.push(this);
  }

  static generateId = () => usersIdCounter += 1;
}

module.exports = {
  Transaction,
  User,
  users,
  transactions,
};

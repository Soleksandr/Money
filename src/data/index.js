const transactions = [];
const users = [];

let transactionsIdCounter = 0;
let usersIdCounter = 0;

class Transaction {
  constructor({ title, cost, payerId, participantsId }) {
    this.title = title;
    this.cost = cost;
    this.participantsId = participantsId;
    this.payerId = payerId;
    this.id = Transaction.generateId();
    this.addTransactionIdToUsers(participantsId);
  }

  static generateId = () => transactionsIdCounter += 1;

  addTransactionIdToUsers = (participantsId) => {
    participantsId.forEach((id) => {
      const participant = users.find(user => user.id === Number(id));
      participant.transactionsId.push(this.id);
    });
  }
}

class User {
  constructor({ name, surname }) {
    this.name = name;
    this.surname = surname;
    this.transactionsId = [];
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

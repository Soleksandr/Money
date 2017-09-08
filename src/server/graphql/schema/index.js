const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type User {
    id: Int!
    username: String!
    name: String!
    surname: String!
    money: String
  }

  type Transaction {
    id: Int!
    title: String!
    cost: String!
    payer: User
    participants: [User!]!
  }

  type Query {
    getUsers: [User]!
    getTransactions: [Transaction]!
    getParticipants: [User]!
  }

  type Mutation {
    createUser(
      username: String!,
      name: String!,
      surname: String!,
      password: String!
    ): User

    createTransaction(
      title: String!,
      cost: Int!,
      payerId: Int!,
      participantsId: [Int!]!
    ): Transaction
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });

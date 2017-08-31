const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type User {
    id: ID!
    username: String!
    name: String!
    surname: String!
  }

  type Transaction {
    id: ID!
    title: String!
    cost: String!
    payer: User
    participantsId: [User!]!
  }

  type Query {
    getUsers: [User!]!
    getTransactions: [Transaction!]!
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
      participants: [Int!]!
    ): Transaction
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });

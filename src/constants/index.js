export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const GET_USERS = 'GET_USERS';
export const CREATE_USER = 'CREATE_USER';
export const USER_INITIALIZE = 'USER_INITIALIZE';
export const GET_USER_TRANSACTIONS = 'GET_USER_TRANSACTIONS';
export const GET_TRANSACTION = 'GET_TRANSACTION';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const FETHCING_DATA = 'FETHCING_DATA';
export const NOT_EMPTY = 'NOT_EMPTY';
export const IS_NUMBER = 'IS_NUMBER';
export const ANY_SELECTED = 'ANY_SELECTED';
export const ANY_CHECKED = 'ANY_CHECKED';
export const GET_PARTICIPANTS = 'GET_PARTICIPANTS';
export const QUERY_PARTICIPANTS = `{
  getParticipants {
    id
    username
    name
    surname
    money
  }
}`;
export const QUERY_TRANSACTIONS = `{
  getTransactions {
    id
    title
    cost
    payer {
      id
      name
      surname
    }
    participants {
      id
      name
      surname
    }
  }
}`;
export const QUERY_USERS = `{
  getUsers {
    id
    name
    surname
    username
  }
}`;
export const MUTATION_TRANSACTIONS = `mutation createTransaction(
  $title: String!,
  $cost: Int!,
  $payerId: Int!,
  $participantsId: [Int!]!
) {
  createTransaction(
    title: $title,
    cost: $cost,
    payerId: $payerId,
    participantsId: $participantsId
  ) {
    id
    title
    cost
    payer {
      id
      name
      surname
    }
    participants {
      id
      name
      surname
    }
  }
}`;
export const MUTATION_USERS = `mutation createUser(
  $username: String!,
  $name: String!,
  $surname: String!,
  $password: String!
) {
  createUser(
    username: $username,
    name: $name,
    surname: $surname,
    password: $password
  ) {
    id
    username
    name
    surname
  }
}`;

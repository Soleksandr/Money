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
export const ADD_USER = 'ADD_USER';
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
export const MUTATION_USERS = `mutation addUser(
  $username: String!,
  $name: String!,
  $surname: String!,
) {
  addUser(
    username: $username,
    name: $name,
    surname: $surname,
  ) {
    id
    username
    name
    surname
  }
}`;

export const RAW_Q_TRANSACTIONS = `
SELECT
  "transactions"."id" as "transactionId",
  "transactions"."title",
  "transactions"."cost",
  "users"."id" as "payerId",
  "users"."name" as "payerName",
  "users"."surname" as "payerSurname",
  "users"."username" as "payerUsername",
  "participants"."id" as "participantId",
  "participants"."name" as "participantName",
  "participants"."surname" as "participantSurname",
  "participants"."username" as "participantUsername"
FROM "transactions"
LEFT JOIN "users"
ON "transactions"."payerId"="users"."id"
LEFT JOIN
  (
    SELECT
    "userTransaction"."transactionId",
    "users"."name",
    "users"."surname",
    "users"."username",
    "users"."id"
    FROM "userTransaction"
    LEFT JOIN "users"
    ON "userTransaction"."userId"="users"."id"
  )
AS "participants"
ON "transactions"."id" = "participants"."transactionId"
WHERE "transactions"."id" IN (
  SELECT "transactionId"
  FROM "userTransaction"
  WHERE "userId"=:userId
) OR "transactions"."payerId"=:userId`;

export const RAW_Q_PARTICIPANTS = `
SELECT "p"."id", "p"."name", "p"."surname", "p"."username", SUM(result) as money
FROM (
  SELECT "users"."id", "users"."name", "users"."surname", "users"."username",
    SUM(round("transactions"."cost" /
      (SELECT COUNT("userId")
      FROM "userTransaction"
      WHERE "userTransaction"."transactionId"="transactions"."id" ), 2))
      AS result
	FROM "transactions", "users"
  WHERE "users"."id"
  IN (
		SELECT "userId" FROM "userTransaction"
    WHERE "userTransaction"."transactionId"="transactions"."id")
		AND "users"."id" <> :userId
		AND "transactions"."payerId"=:userId
	GROUP BY "users"."id"
	UNION
	SELECT "users"."id", "users"."name", "users"."surname", "users"."username",
    -SUM(round("transactions"."cost" /
	    (SELECT COUNT("userId")
      FROM "userTransaction"
      WHERE "userTransaction"."transactionId"="transactions"."id" ), 2))
      AS result
	FROM "transactions", "users"
  WHERE "users"."id"="transactions"."payerId"
  AND "users"."id" <> :userId
  AND "transactions"."id" IN (
	  SELECT "transactionId"
	  FROM "userTransaction"
	  WHERE "userId"=:userId)
	GROUP BY "users"."id")
AS p
GROUP BY "p"."id", "p"."name", "p"."surname", "p"."username"`;

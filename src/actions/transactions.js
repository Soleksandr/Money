import * as constants from '../constants';
import { fetchQuery } from '../apiCalls/graphql';

export const getTransactions = dispatch => () =>
fetchQuery(constants.QUERY_TRANSACTIONS).then((result) => {
  const transactions = result.data.getTransactions;
  dispatch({
    type: constants.GET_TRANSACTIONS,
    payload: transactions,
  });
});

export const createTransaction = dispatch => data =>
  fetchQuery(constants.MUTATION_TRANSACTIONS, data).then((result) => {
    const transaction = result.data.createTransaction;
    dispatch({
      type: constants.CREATE_TRANSACTION,
      payload: transaction,
    });
  });

import * as constants from '../constants';
import * as transactionsApiCalls from '../apiCalls/transactions';

export const getTransactions = dispatch => () =>
  transactionsApiCalls.getTransactions().then(transactions =>
    dispatch({
      type: constants.GET_TRANSACTIONS,
      payload: transactions,
    }));

export const addTransaction = dispatch => data =>
  transactionsApiCalls.addTransaction(data).then(transaction =>
    dispatch({
      type: constants.ADD_TRANSACTION,
      payload: transaction,
    }));

import * as constants from '../constants';
import * as transactionsApiCalls from '../apiCalls/transactions';

export const getTransactions = dispatch => () =>
  transactionsApiCalls.getTransactions().then(transactions =>
    dispatch({
      type: constants.GET_TRANSACTIONS,
      payload: transactions,
    }));

export const createTransaction = dispatch => data =>
  transactionsApiCalls.createTransaction(data).then(((transaction) => {
    console.log('transaction from json', transaction)
    dispatch({
      type: constants.CREATE_TRANSACTION,
      payload: transaction,
    });
  }));

import * as constants from '../constants';
import * as transactionsApiCalls from '../apiCalls/transactions';

const getTransactionsActionCreator = transactions => ({
  type: constants.GET_TRANSACTIONS,
  payload: transactions,
});

export const getTransactions = dispatch => () =>
  transactionsApiCalls.getTransactions().then(transactions =>
    dispatch(getTransactionsActionCreator(transactions)));

const addTransactionActionCreator = transaction => ({
  type: constants.ADD_TRANSACTION,
  payload: transaction,
});

export const addTransaction = dispatch => data =>
  transactionsApiCalls.addTransaction(data).then(transaction =>
    dispatch(addTransactionActionCreator(transaction)));

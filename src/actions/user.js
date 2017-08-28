import * as constants from '../constants';
import * as userApiCalls from '../apiCalls/user';
import * as transactionsApiCalls from '../apiCalls/transactions';

export const createUser = dispatch => data =>
  userApiCalls.createUser(data).then((user) => {
    dispatch({
      type: constants.CREATE_USER,
      payload: user,
    });
    dispatch({
      type: constants.GET_TRANSACTIONS,
      payload: [],
    });
  });

export const userInitialize = dispatch => () => {
  dispatch({
    type: constants.FETHCING_DATA,
    payload: true,
  });
  return userApiCalls.userInitialize().then((user) => {
    dispatch({
      type: constants.USER_INITIALIZE,
      payload: user,
    });
    dispatch({
      type: constants.FETHCING_DATA,
      payload: false,
    });
  });
};

export const login = dispatch => data =>
  userApiCalls.login(data).then((user) => {
    dispatch({
      type: constants.LOG_IN,
      payload: user,
    });
    transactionsApiCalls.getTransactions().then(transactions =>
      dispatch({
        type: constants.GET_TRANSACTIONS,
        payload: transactions,
      }));
  });

export const logout = dispatch => () =>
  userApiCalls.logout().then((res) => {
    dispatch({
      type: constants.LOG_OUT,
      payload: res,
    });
    dispatch({
      type: constants.GET_TRANSACTIONS,
      payload: [],
    });
  });

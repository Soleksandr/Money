import * as constants from '../constants';
import * as userApiCalls from '../apiCalls/user';

// register should return username usersurname
export const createUser = dispatch => data =>
  userApiCalls.createUser(data).then(user =>
    dispatch({
      type: constants.CREATE_USER,
      payload: user,
    }));

export const userInitialize = dispatch => () => {
  dispatch({
    type: constants.FETHCING_DATA,
    payload: true,
  });
  return userApiCalls.userInitialize().then(user => {
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

export const logIn = dispatch => () =>
  userApiCalls.logIn().then(data =>
    dispatch({
      type: constants.LOG_IN,
      payload: data,
    }));

export const logOut = dispatch => data =>
  userApiCalls.logOut(data).then(() =>
    dispatch({
      type: constants.ADD_USER,
      payload: null,
    }));
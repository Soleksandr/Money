import * as constants from '../constants';
import * as usersApi from '../apiCalls/users';

const getUsersActionCreator = users => ({
  type: constants.GET_USERS,
  payload: users,
});

export const getUsers = dispatch => () =>
  usersApi.getUsers().then(transactions =>
    dispatch(getUsersActionCreator(transactions)));


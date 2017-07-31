import * as constants from '../constants';
import * as usersApiCalls from '../apiCalls/users';

const getUsersActionCreator = users => ({
  type: constants.GET_USERS,
  payload: users,
});

export const getUsers = dispatch => () =>
  usersApiCalls.getUsers().then(transactions =>
    dispatch(getUsersActionCreator(transactions)));

const addUserActionCreator = user => ({
  type: constants.ADD_USER,
  payload: user,
});

export const addUser = dispatch => data =>
  usersApiCalls.addUser(data).then(user =>
    dispatch(addUserActionCreator(user)));

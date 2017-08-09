import * as constants from '../constants';
import * as usersApiCalls from '../apiCalls/users';


export const getUsers = dispatch => () =>
  usersApiCalls.getUsers().then(users =>
    dispatch({
      type: constants.GET_USERS,
      payload: users,
    }));

export const addUser = dispatch => data =>
  usersApiCalls.addUser(data).then(user =>
    dispatch({
      type: constants.ADD_USER,
      payload: user,
    }));

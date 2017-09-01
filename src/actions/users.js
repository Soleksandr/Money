import * as constants from '../constants';
import * as usersApiCalls from '../apiCalls/users';

export const getUsers = dispatch => () =>
  usersApiCalls.getUsers().then(users =>
    dispatch({
      type: constants.GET_USERS,
      payload: users,
    }));

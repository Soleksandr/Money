import * as constants from '../constants';
import { fetchQuery } from '../apiCalls/graphql';

export const addUser = dispatch => data =>
  fetchQuery(constants.MUTATION_USERS, data).then((result) => {
    const user = result.data.addUser;
    dispatch({
      type: constants.CREATE_USER,
      payload: user,
    });
  });

export const getUsers = dispatch => () =>
fetchQuery(constants.QUERY_USERS).then((result) => {
  const users = result.data.getUsers;
  dispatch({
    type: constants.GET_USERS,
    payload: users,
  });
});


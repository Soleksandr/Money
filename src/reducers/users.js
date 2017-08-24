import * as constants from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.GET_USERS:
      return action.payload;
    case constants.CREATE_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

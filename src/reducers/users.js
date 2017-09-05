import * as constants from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.CREATE_USER:
      return [...state, action.payload];
    case constants.GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

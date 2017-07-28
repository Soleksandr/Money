import * as constants from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.GET_TRANSACTIONS:
      return action.payload;
    case constants.ADD_TRANSACTION:
      return [...state, action.payload];
    default:
      return state;
  }
};
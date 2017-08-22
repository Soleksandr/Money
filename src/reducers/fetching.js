import * as constants from '../constants';

export default (state = false, action) => {
  switch (action.type) {
    case constants.FETHCING_DATA:
      return action.payload;
    default:
      return state;
  }
};

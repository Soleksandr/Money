import * as constants from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case constants.CREATE_USER:
      return action.payload;
    case constants.USER_INITIALIZE:
      return action.payload;
    case constants.LOG_IN:
      return action.payload;
    case constants.LOG_OUT:
      return action.payload;
    default:
      return state;
  }
};

import * as constants from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case constants.CREATE_USER:
      return action.payload;
    case constants.CHECK_AUTHENTICATION:
      return action.payload;
    case constants.LOG_IN:
      return action.payload;
    case constants.LOG_OUT:
      return null;
    default:
      return state;
  }
};

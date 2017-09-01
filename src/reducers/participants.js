import * as constants from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case constants.GET_PARTICIPANTS:
      return action.payload;
    default:
      return state;
  }
};

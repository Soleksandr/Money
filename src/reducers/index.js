import { combineReducers } from 'redux';
import transactionsReducer from './transactions';
import usersReducer from './users';
import userReducer from './user';
import fetchingReducer from './fetching';
import participantsReducer from './participants';

export default combineReducers({
  transactions: transactionsReducer,
  users: usersReducer,
  user: userReducer,
  fetching: fetchingReducer,
  participants: participantsReducer,
});
